import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Learner } from '../../models/learner';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { LearnerHttpService } from './learner-http.service';
import { confirm } from 'devextreme/ui/dialog';

interface LearnerState {
  learnerList: Array<Learner>;
  bloodTypeStatistics: Array<Object>;
  jobStatistics: Array<Object>;
  genderStatistics: Array<Object>;
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
  bloodTypeStatistics: [],
  jobStatistics: [],
  genderStatistics: [],
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class LearnerStore extends StateService<LearnerState> {
  constructor(
    private learnerService: LearnerHttpService,
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
            pendingCheckupList: this.fillEmpty(
              page,
              size,
              this.state.pendingCheckupList,
              data.items
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
    let fillIndex = startIndex * endIndex;
    for (var j = 0; j < addedArray.length; j++) {
      result[fillIndex] = addedArray[j];
      fillIndex++;
    }
    // endIndex = pageSize
    // pageSize = 5
    // 0 => 0 ,1,2,3,4,
    // 1 -> 5,6,7,8,9
    // 2 -> 10,11,12,13,14
    // 17 -> 85,86,87,88,89
    console.log('Filled array result');
    console.log(result);
    return result;
  }

  getBloodTypeCount(value: string) {
    this.store.setIsLoading(true);
    return this.learnerService
      .filterLearnerByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          bloodTypeStatistics: this.state.bloodTypeStatistics.concat({
            bloodType: value,
            totalCount: data.totalItems,
          }),
        });
        this.store.setIsLoading(false);
      });
  }

  getBloodTypeStatistics() {
    // value = 'O' | 'A' | 'B' |
    this.setState({ bloodTypeStatistics: [] });
    this.getBloodTypeCount('O').then(() => {
      this.getBloodTypeCount('A').then(() => {
        this.getBloodTypeCount('B');
      });
    });
  }

  getJobCount(value: string) {
    this.store.setIsLoading(true);
    return this.learnerService
      .filterLearnerByJob(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          jobStatistics: this.state.jobStatistics.concat({
            job: value,
            totalCount: data.totalItems,
          }),
        });
        this.store.setIsLoading(false);
      });
  }

  getJobStatistics() {
    const jobList = [
      'Student',
      'Teacher',
      'Thief',
      'Space Pirate',
      'Spaceship Commander',
      'Sea Pirate',
      'Shogun',
      'Music Conductor',
      'Fullstack Developer',
      'Mecha Pilot',
      'Tester',
      'Galatic Defender',
      'Engineer',
    ];
    this.setState({ jobStatistics: [] });
    jobList.forEach((element) => {
      this.getJobCount(element);
    });
  }

  getGenderCount(value: string) {
    this.store.setIsLoading(true);
    return this.learnerService
      .filterLearnerByGender(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          genderStatistics: this.state.genderStatistics.concat({
            gender: value,
            totalCount: data.totalItems,
          }),
        });
        this.store.setIsLoading(false);
      });
  }

  getGenderStatistics() {
    const genderList = ['Male', 'Female'];
    this.setState({ genderStatistics: [] });
    genderList.forEach((element) => {
      this.getGenderCount(element);
    });
  }

  initData(page: number, size: number) {
    this.learnerService
      .fetchLearner(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalItems),
        });
        console.log('Current flag: pure list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.learnerService
      .filterLearnerByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalItems),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterLearnerByCategory(value, page, size);
      });
  }

  initSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.learnerService
      .searchLearnerByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalItems),
        });
        console.log('Current flag: searched list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchLearnerByName(value, page, size);
      });
  }

  initSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.learnerService
      .sortLearnerByPrice(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortLearnerByPrice(value, page, size);
      });
  }

  initSortByName(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.learnerService
      .sortLearnerByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          learnerList: new Array<Learner>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.learnerList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortLearnerByName(value, page, size);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.learnerService.fetchLearner(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          learnerList: this.fillEmpty(
            page,
            size,
            this.state.learnerList,
            data.items
          ),
        });
        console.log('Pure list');
        console.log(this.state.learnerList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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
            page,
            size,
            this.state.learnerList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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

  $bloodTypeStatistics: Observable<Array<Object>> = this.select(
    (state) => state.bloodTypeStatistics
  );

  $jobStatistics: Observable<Array<Object>> = this.select(
    (state) => state.jobStatistics
  );

  $genderStatistics: Observable<Array<Object>> = this.select(
    (state) => state.genderStatistics
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

  updateLearner(learner: Learner, key: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.learnerService.updateLearner(learner, key).subscribe({
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
        this.learnerService
          .deleteSelectedLearners(selectedLearners)
          .subscribe({
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

  deleteAllLearners() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.learnerService.deleteAllLearners().subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setState({ learnerList: [] });
            this.setState({ totalPages: 0 });
            this.setState({ currentPage: 0 });
            this.setState({ totalItems: 0 });
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

  deleteLearner(id: string, page: number, size: number) {
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

  getLearnerByUserName(username: string) {
    this.setIsLoading(true);
    return this.learnerService
      .getLearnerByUserName(username)
      .toPromise()
      .then((data: any) => {
        this.setState({ learnerInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  filterLearnerByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.learnerService
      .filterLearnerByPrice(criteria, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            learnerList: this.fillEmpty(
              page,
              size,
              this.state.learnerList,
              data.items
            ),
          });
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  filterLearnerByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.learnerService.filterLearnerByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          learnerList: this.fillEmpty(
            page,
            size,
            this.state.learnerList,
            data.items
          ),
        });
        console.log('Filtered list');
        console.log(this.state.learnerList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  searchLearnerByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.learnerService.searchLearnerByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          learnerList: this.fillEmpty(
            page,
            size,
            this.state.learnerList,
            data.items
          ),
        });
        console.log('Searched list');
        console.log(this.state.learnerList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  sortLearnerByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.learnerService.sortLearnerByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          learnerList: this.fillEmpty(
            page,
            size,
            this.state.learnerList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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

  sortLearnerByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.learnerService.sortLearnerByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          learnerList: this.fillEmpty(
            page,
            size,
            this.state.learnerList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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

  setExportData(array: Array<Learner>) {
    this.setState({ learnerList: array });
  }
}
