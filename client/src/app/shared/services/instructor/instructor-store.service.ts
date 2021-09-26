import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { InstructorHttpService } from './instructor-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { UserHttpService } from '../user/user-http.service';
import { FileStore } from '../file/file-store.service';

interface InstructorState {
  instructorList: Array<Instructor>;
  exportData: Array<Instructor>;
  selectedInstructor: Object;
  instructorInstance: Instructor;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: InstructorState = {
  instructorList: [],
  selectedInstructor: {},
  instructorInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class InstructorStore extends StateService<InstructorState> {
  constructor(
    private instructorService: InstructorHttpService,
    private userService: UserHttpService,
    private fileStore: FileStore,
    private store: StoreService
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
    sourceArray: Array<Instructor>,
    addedArray: Array<Instructor>
  ): Array<Instructor> {
    let result: Array<Instructor> = sourceArray;
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

  initInfiniteData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.setIsLoading(true);
    return this.userService
      .filterUserByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infite list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  loadInfiniteDataAsync(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .filterUserByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              instructorList: this.state.instructorList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Infinite list');
          console.log(this.state.instructorList);
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
    this.instructorService
      .fetchInstructorByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            instructorList: this.fillEmpty(
              page - 1,
              size,
              this.state.instructorList,
              data.data
            ),
          });
          console.log('Pure list');
          console.log(this.state.instructorList);
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
    return this.instructorService
      .fetchInstructorByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.instructorList);
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
    this.instructorService
      .fetchInstructorByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            instructorList: this.state.instructorList.concat(data.data),
          });
          console.log('Infinite list');
          console.log(this.state.instructorList);
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
    this.instructorService
      .fetchInstructor(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.instructorList);
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
    this.store.showNotif('Filtered Mode On', 'custom');
    this.instructorService
      .filterInstructorByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterInstructorByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.instructorService
      .filterInstructorByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infinite filtered list');
        console.log(this.state.instructorList);
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
    this.store.showNotif('Searched Mode On', 'custom');
    this.instructorService
      .searchInstructorByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchInstructorByProperty(property, value, page, size);
      });
  }

  initInfiniteSearchByPropertyData(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.userService
      .filterSearchUserByProperty(
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
            instructorList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.instructorList);
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
    this.store.showNotif('Sort Mode On', 'custom');
    this.instructorService
      .sortInstructorByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortInstructorByProperty(value, order, page, size);
      });
  }

  initInfiniteSortByPropertyData(
    filterProperty: string,
    filterValue: string,
    sortProperty: string,
    sortValue: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.userService
      .filterSortUserByProperty(
        filterProperty,
        filterValue,
        sortProperty,
        sortValue,
        page,
        size
      )
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: sort list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.fetchInstructor(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.fillEmpty(
            page - 1,
            size,
            this.state.instructorList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.instructorList);
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
    this.instructorService.fetchInstructor(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.fillEmpty(
            page - 1,
            size,
            this.state.instructorList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.instructorList);
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

  $instructorList: Observable<Array<Instructor>> = this.select(
    (state) => state.instructorList
  );

  $exportData: Observable<Array<Instructor>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedInstructor: Observable<Object> = this.select(
    (state) => state.selectedInstructor
  );

  $instructorInstance: Observable<Instructor> = this.select(
    (state) => state.instructorInstance
  );

  uploadInstructor(instructor: Instructor, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.instructorService.uploadInstructor(instructor).subscribe({
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

  updateInstructor(instructor: Instructor, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.instructorService.updateInstructor(instructor).subscribe({
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

  deleteSelectedInstructors(
    selectedInstructors: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.instructorService.deleteInstructor(selectedInstructors).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.instructorList);
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
        this.instructorService.deleteAll().subscribe({
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

  deleteInstructor(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.instructorService.deleteInstructor(id).subscribe({
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

  selectInstructor(_instructor: Instructor) {
    this.setState({ selectedInstructor: _instructor });
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

  filterInstructorByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.instructorService
      .filterInstructorByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              instructorList: this.fillEmpty(
                page - 1,
                size,
                this.state.instructorList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.instructorList);
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

  filterInfiniteInstructorByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.instructorService
      .filterInstructorByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              instructorList: this.state.instructorList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Filtered list');
          console.log(this.state.instructorList);
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

  searchInstructorByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.instructorService
      .searchInstructorByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              instructorList: this.fillEmpty(
                page - 1,
                size,
                this.state.instructorList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.instructorList);
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

  searchInfiniteInstructorByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .filterSearchUserByProperty(
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
                instructorList: this.state.instructorList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Infite searched list');
          console.log(this.state.instructorList);
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

  sortInstructorByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.instructorService
      .sortInstructorByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            instructorList: this.fillEmpty(
              page - 1,
              size,
              this.state.instructorList,
              data.data
            ),
          });
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          console.log('Sorted list');
          console.log(this.state.instructorList);
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

  sortInfiniteInstructorByProperty(
    filterValue: string,
    filterProperty: string,
    sortProperty: string,
    sortValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .filterSortUserByProperty(
        filterValue,
        filterProperty,
        sortProperty,
        sortValue,
        page,
        size
      )
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              instructorList: this.state.instructorList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Infite sorted list');
          console.log(this.state.instructorList);
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

  getInstructor(id: string) {
    this.setIsLoading(true);
    return this.instructorService
      .getInstructor(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ instructorInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<Instructor>) {
    this.setState({ instructorList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
