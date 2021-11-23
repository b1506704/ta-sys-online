import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curriculum } from '../../models/curriculum';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { CurriculumHttpService } from './curriculum-http.service';
import { confirm } from 'devextreme/ui/dialog';

interface CurriculumState {
  curriculumList: Array<Curriculum>;
  exportData: Array<Curriculum>;
  selectedCurriculum: Object;
  curriculumInstance: Curriculum;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: CurriculumState = {
  curriculumList: [],
  selectedCurriculum: {},
  curriculumInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class CurriculumStore extends StateService<CurriculumState> {
  constructor(
    private curriculumService: CurriculumHttpService,
    private store: StoreService
  ) {
    super(initialState);
  }
  //
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<Curriculum>,
    addedArray: Array<Curriculum>
  ): Array<Curriculum> {
    let result: Array<Curriculum> = sourceArray;
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

  initInfiniteData(page: number, size: number) {
    return this.curriculumService
      .fetchCurriculum(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.curriculumList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.curriculumService.fetchCurriculum(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          curriculumList: this.state.curriculumList.concat(data.data),
        });
        console.log('Infinite list');
        console.log(this.state.curriculumList);
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
    this.curriculumService.fetchCurriculumByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          curriculumList: this.fillEmpty(
            page - 1,
            size,
            this.state.curriculumList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.curriculumList);
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
    return this.curriculumService
      .fetchCurriculumByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.curriculumList);
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
    this.curriculumService.fetchCurriculumByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          curriculumList: this.state.curriculumList.concat(data.data),
        });
        console.log('Infinite list');
        console.log(this.state.curriculumList);
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
    this.curriculumService
      .fetchCurriculum(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: new Array<Curriculum>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.curriculumList);
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
    this.curriculumService
      .filterCurriculumByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: new Array<Curriculum>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.curriculumList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterCurriculumByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.curriculumService
      .filterCurriculumByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: data.data,
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.curriculumList);
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
    this.curriculumService
      .searchCurriculumByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: new Array<Curriculum>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.curriculumList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchCurriculumByProperty(property, value, page, size);
      });
  }

  initInfiniteSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //
    this.curriculumService
      .searchCurriculumByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            curriculumList: data.data,
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.curriculumList);
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
    this.curriculumService
      .sortCurriculumByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: new Array<Curriculum>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.curriculumList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortCurriculumByProperty(value, order, page, size);
      });
  }

  initInfiniteSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.curriculumService
      .sortCurriculumByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          curriculumList: data.data,
        });
        console.log('Current flag: sort list');
        console.log(this.state.curriculumList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.curriculumService.fetchCurriculum(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          curriculumList: this.fillEmpty(
            page - 1,
            size,
            this.state.curriculumList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.curriculumList);
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
    this.curriculumService.fetchCurriculum(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          curriculumList: this.fillEmpty(
            page - 1,
            size,
            this.state.curriculumList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.curriculumList);
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

  $curriculumList: Observable<Array<Curriculum>> = this.select(
    (state) => state.curriculumList
  );

  $exportData: Observable<Array<Curriculum>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedCurriculum: Observable<Object> = this.select(
    (state) => state.selectedCurriculum
  );

  $curriculumInstance: Observable<Curriculum> = this.select(
    (state) => state.curriculumInstance
  );

  uploadCurriculum(curriculum: Curriculum, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.curriculumService.uploadCurriculum(curriculum).subscribe({
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

  updateCurriculum(curriculum: Curriculum, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.curriculumService.updateCurriculum(curriculum).subscribe({
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

  deleteSelectedCurriculums(
    selectedCurriculums: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.curriculumService.deleteCurriculum(selectedCurriculums).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.curriculumList);
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
        this.curriculumService.deleteAll().subscribe({
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

  deleteCurriculum(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.curriculumService.deleteCurriculum(id).subscribe({
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

  selectCurriculum(_curriculum: Curriculum) {
    this.setState({ selectedCurriculum: _curriculum });
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

  filterCurriculumByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.curriculumService
      .filterCurriculumByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              curriculumList: this.fillEmpty(
                page - 1,
                size,
                this.state.curriculumList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.curriculumList);
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

  filterInfiniteCurriculumByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.curriculumService
      .filterCurriculumByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            curriculumList: this.state.curriculumList.concat(data),
          });
          console.log('Filtered list');
          console.log(this.state.curriculumList);
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

  searchCurriculumByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.curriculumService
      .searchCurriculumByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              curriculumList: this.fillEmpty(
                page - 1,
                size,
                this.state.curriculumList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.curriculumList);
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

  searchInfiniteCurriculumByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.curriculumService
      .searchCurriculumByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              curriculumList: this.state.curriculumList.concat(data),
            });
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
          console.log(this.state.curriculumList);
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

  sortCurriculumByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.curriculumService
      .sortCurriculumByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            curriculumList: this.fillEmpty(
              page - 1,
              size,
              this.state.curriculumList,
              data.data
            ),
          });
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          console.log('Sorted list');
          console.log(this.state.curriculumList);
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

  sortInfiniteCurriculumByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.curriculumService
      .sortCurriculumByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            curriculumList: this.state.curriculumList.concat(data),
          });
          console.log('Infite sorted list');
          console.log(this.state.curriculumList);
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

  getCurriculum(id: string) {
    this.setIsLoading(true);
    return this.curriculumService
      .getCurriculum(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ curriculumInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<Curriculum>) {
    this.setState({ curriculumList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
