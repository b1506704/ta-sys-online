import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../models/test';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { TestHttpService } from './test-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { FileStore } from '../file/file-store.service';

interface TestState {
  testList: Array<Test>;
  exportData: Array<Test>;
  selectedTest: Object;
  isUploading: boolean;
  testInstance: Test;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: TestState = {
  testList: [],
  selectedTest: {},
  isUploading: undefined,
  testInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class TestStore extends StateService<TestState> {
  constructor(
    private testService: TestHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {
    super(initialState);
  }
  /**
   * This is a function which fills the items received from pagination in a specific store's state variable.
   * 
   * @author Le Bao Anh
   * @version 1.0.0
   * @param {number} startIndex - The current page of ss pagination
   * @param {number} endIndex - The page size of ss pagination
   * @param {Array<Object>} sourceArray - The source array/state in a specific store service
   * @param {Array<Object>} addedArray - The array of items received from ss pagination
   * @return {Array<Object>} Return an array with filled items from ss pagination
   * @example
   * this.setState({
            sourceList: this.fillEmpty(
              page - 1,
              size,
              this.state.sourceList,
              arrayItemFromServer
            ),
          });
   */
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<Test>,
    addedArray: Array<Test>
  ): Array<Test> {
    let result: Array<Test> = sourceArray;
    console.log('FILL INDEX');
    let fillIndex = startIndex * endIndex;
    console.log(fillIndex);
    for (var j = 0; j < addedArray.length; j++) {
      result[fillIndex] = addedArray[j];
      fillIndex++;
    }
    // endIndex = pageSize
    // pageSize = 5
    // 0 => 0,1,2,3,4,
    // 1 -> 5,6,7,8,9
    // 2 -> 10,11,12,13,14
    // 17 -> 85,86,87,88,89
    console.log('Filled array result');
    console.log(result);
    return result;
  }

  fetchMediaBySourceID(sourceIDs: Array<string>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  initInfiniteData(page: number, size: number) {
    return this.testService
      .fetchTest(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infite list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.testService.fetchTest(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          testList: this.state.testList.concat(data.data),
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Infinite list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  loadDataAsyncByLearnerID(page: number, size: number, learnerID: string) {
    this.setIsLoading(true);
    this.testService.fetchTestByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          testList: this.fillEmpty(
            page - 1,
            size,
            this.state.testList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  initInfiniteDataByLearnerID(page: number, size: number, learnerID: string) {
    return this.testService
      .fetchTestByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadInfiniteDataAsyncByLearnerID(
    page: number,
    size: number,
    learnerID: string
  ) {
    this.setIsLoading(true);
    this.testService.fetchTestByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          testList: this.state.testList.concat(data.data),
        });
        console.log('Infinite list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  initData(page: number, size: number) {
    this.testService
      .fetchTest(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.testService
      .filterTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterTestByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.testService
      .filterTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infinite filtered list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .searchTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchTestByProperty(property, value, page, size);
      });
  }

  initInfiniteSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .searchTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            testList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initInfiniteFilterSearchByPropertyData(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .filterSearchTestByProperty(
        filterProperty,
        filterValue,
        searchProperty,
        searchValue,
        page,
        size
      )
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            testList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .sortTestByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortTestByProperty(value, order, page, size);
      });
  }

  initInfiniteSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .sortTestByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: sort list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.testService.fetchTest(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          testList: this.fillEmpty(
            page - 1,
            size,
            this.state.testList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  refresh(page: number, size: number) {
    this.setIsLoading(true);
    this.testService.fetchTest(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          testList: this.fillEmpty(
            page - 1,
            size,
            this.state.testList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.store.showNotif('Refresh successfully', 'custom');
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $testList: Observable<Array<Test>> = this.select((state) => state.testList);

  $exportData: Observable<Array<Test>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedTest: Observable<Object> = this.select(
    (state) => state.selectedTest
  );

  $isUploading: Observable<boolean> = this.select((state) => state.isUploading);

  $testInstance: Observable<Test> = this.select((state) => state.testInstance);

  uploadTest(test: Test, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.uploadTest(test).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems + 1);
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  updateTest(test: Test, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.updateTest(test).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  deleteSelectedTests(
    selectedTests: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.deleteTest(selectedTests).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.testList);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  deleteAll() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.deleteAll().subscribe({
          next: (data: any) => {
            this.resetState();
            console.log(data);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  deleteTest(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.deleteTest(id).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems - 1);
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  selectTest(_test: Test) {
    this.setState({ selectedTest: _test });
  }

  setTotalPages(_totalPages: number) {
    this.setState({ totalPages: _totalPages });
  }

  setTotalItems(_totalItems: number) {
    this.setState({ totalItems: _totalItems });
  }

  setCurrentPage(_currentPage: number) {
    this.setState({ currentPage: _currentPage });
  }

  filterTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              testList: this.fillEmpty(
                page - 1,
                size,
                this.state.testList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.testList);
            console.log('Server response');
            console.log(data);
            this.setState({ totalItems: data.totalRecords });
            this.setState({ totalPages: data.totalPages });
            this.setState({ currentPage: data.pageNumber });
          }
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  filterInfiniteTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              testList: this.state.testList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Filtered list');
          console.log(this.state.testList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  filterSearchInfiniteTestByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterSearchTestByProperty(
        filterProperty,
        filterValue,
        searchProperty,
        searchValue,
        page,
        size
      )
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            if (data.data.length) {
              this.setState({
                testList: this.state.testList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Infite searched list');
          console.log(this.state.testList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  searchTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .searchTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              testList: this.fillEmpty(
                page - 1,
                size,
                this.state.testList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.testList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  searchInfiniteTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .searchTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            if (data.data.length) {
              this.setState({
                testList: this.state.testList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
          console.log(this.state.testList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  sortTestByProperty(value: string, order: string, page: number, size: number) {
    this.setIsLoading(true);
    this.testService.sortTestByProperty(value, order, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          testList: this.fillEmpty(
            page - 1,
            size,
            this.state.testList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Sorted list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  sortInfiniteTestByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService.sortTestByProperty(value, order, page, size).subscribe({
      next: (data: any) => {
        if (data.data.length) {
          this.setState({
            testList: this.state.testList.concat(data.data),
          });
          this.fetchMediaBySourceID(data.data);
        }
        console.log('Infite sorted list');
        console.log(this.state.testList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  getTest(id: string) {
    this.setIsLoading(true);
    return this.testService
      .getTest(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ testInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setIsUploading(isUploading: boolean) {
    this.setState({ isUploading: isUploading });
  }

  setExportData(array: Array<Test>) {
    this.setState({ testList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
