import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from '../../models/learner';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { LearnerHttpService } from './learner-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { UserHttpService } from '../user/user-http.service';

interface LearnerState {
  learnerList: Array<Learner>;
  exportData: Array<Learner>;
  selectedLearner: Object;
  learnerInstance: Learner;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: LearnerState = {
  learnerList: [],
  selectedLearner: {},
  learnerInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class LearnerStore extends StateService<LearnerState> {
  constructor(
    private learnerService: LearnerHttpService,
    private userService: UserHttpService,
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
    sourceArray: Array<Learner>,
    addedArray: Array<Learner>
  ): Array<Learner> {
    let result: Array<Learner> = sourceArray;
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
          learnerList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.learnerList);
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
          this.setState({
            learnerList: this.state.learnerList.concat(data.data),
          });
          console.log('Infinite list');
          console.log(this.state.learnerList);
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
    this.learnerService
      .fetchLearnerByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            learnerList: this.fillEmpty(
              page - 1,
              size,
              this.state.learnerList,
              data.data
            ),
          });
          console.log('Pure list');
          console.log(this.state.learnerList);
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
    return this.learnerService
      .fetchLearnerByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.learnerList);
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
    this.learnerService
      .fetchLearnerByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            learnerList: this.state.learnerList.concat(data.data),
          });
          console.log('Infinite list');
          console.log(this.state.learnerList);
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
    this.learnerService
      .fetchLearner(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.learnerList);
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
    this.learnerService
      .filterLearnerByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterLearnerByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.learnerService
      .filterLearnerByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: data.data,
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.learnerList);
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
    this.learnerService
      .searchLearnerByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchLearnerByProperty(property, value, page, size);
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
            learnerList: data.data,
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.learnerList);
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
    this.learnerService
      .sortLearnerByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortLearnerByProperty(value, order, page, size);
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
          learnerList: data.data,
        });
        console.log('Current flag: sort list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.learnerService.fetchLearner(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          learnerList: this.fillEmpty(
            page - 1,
            size,
            this.state.learnerList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.learnerList);
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
    this.learnerService.fetchLearner(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          learnerList: this.fillEmpty(
            page - 1,
            size,
            this.state.learnerList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.learnerList);
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

  $learnerList: Observable<Array<Learner>> = this.select(
    (state) => state.learnerList
  );

  $exportData: Observable<Array<Learner>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedLearner: Observable<Object> = this.select(
    (state) => state.selectedLearner
  );

  $learnerInstance: Observable<Learner> = this.select(
    (state) => state.learnerInstance
  );

  uploadLearner(learner: Learner, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.learnerService.uploadLearner(learner).subscribe({
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

  updateLearner(learner: Learner, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.learnerService.updateLearner(learner).subscribe({
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

  deleteSelectedLearners(
    selectedLearners: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.learnerService.deleteLearner(selectedLearners).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.learnerList);
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
        this.learnerService.deleteAll().subscribe({
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

  deleteLearner(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.learnerService.deleteLearner(id).subscribe({
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

  selectLearner(_learner: Learner) {
    this.setState({ selectedLearner: _learner });
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

  filterLearnerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.learnerService
      .filterLearnerByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              learnerList: this.fillEmpty(
                page - 1,
                size,
                this.state.learnerList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.learnerList);
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

  filterInfiniteLearnerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.learnerService
      .filterLearnerByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            learnerList: this.state.learnerList.concat(data),
          });
          console.log('Filtered list');
          console.log(this.state.learnerList);
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

  searchLearnerByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.learnerService
      .searchLearnerByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              learnerList: this.fillEmpty(
                page - 1,
                size,
                this.state.learnerList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.learnerList);
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

  searchInfiniteLearnerByProperty(
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
            this.setState({
              learnerList: this.state.learnerList.concat(data),
            });
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
          console.log(this.state.learnerList);
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

  sortLearnerByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.learnerService
      .sortLearnerByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            learnerList: this.fillEmpty(
              page - 1,
              size,
              this.state.learnerList,
              data.data
            ),
          });
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          console.log('Sorted list');
          console.log(this.state.learnerList);
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

  sortInfiniteLearnerByProperty(
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
          this.setState({
            learnerList: this.state.learnerList.concat(data),
          });
          console.log('Infite sorted list');
          console.log(this.state.learnerList);
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

  getLearner(id: string) {
    this.setIsLoading(true);
    return this.learnerService
      .getLearner(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ learnerInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<Learner>) {
    this.setState({ learnerList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
