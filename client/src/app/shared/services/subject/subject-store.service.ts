import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { SubjectHttpService } from './subject-http.service';
import { confirm } from 'devextreme/ui/dialog';

interface SubjectState {
  subjectList: Array<Subject>;
  exportData: Array<Subject>;
  selectedSubject: Object;
  subjectInstance: Subject;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: SubjectState = {
  subjectList: [],
  selectedSubject: {},
  subjectInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class SubjectStore extends StateService<SubjectState> {
  constructor(
    private subjectService: SubjectHttpService,
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
              data
            ),
          });
   */
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<Subject>,
    addedArray: Array<Subject>
  ): Array<Subject> {
    let result: Array<Subject> = sourceArray;
    console.log('FILL INDEX');
    let fillIndex = startIndex * endIndex;
    console.log(fillIndex);
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

  initInfiniteData(page: number, size: number) {
    return this.subjectService
      .fetchSubject(page, size)
      .toPromise()
      .then((data: any) => {
        if (page === 0) {
          this.setState({
            subjectList: new Array<Subject>(size),
          });
        } else {
          this.setState({
            subjectList: new Array<Subject>(page * size),
          });
        }
        console.log('Current flag: infite list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.fetchSubject(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.state.subjectList.concat(data),
        });
        console.log('Infinite list');
        console.log(this.state.subjectList);
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
    this.subjectService.fetchSubjectByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
        });
        console.log('Pure list');
        console.log(this.state.subjectList);
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
    return this.subjectService
      .fetchSubjectByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(data.length),
        });
        console.log('Current flag: infite list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsyncByLearnerID(page, size, learnerID);
      });
  }

  loadInfiniteDataAsyncByLearnerID(
    page: number,
    size: number,
    learnerID: string
  ) {
    this.setIsLoading(true);
    this.subjectService.fetchSubjectByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.state.subjectList.concat(data),
        });
        console.log('Infinite list');
        console.log(this.state.subjectList);
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
    this.subjectService
      .fetchSubject(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.subjectService
      .filterSubjectByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterSubjectByCategory(value, page, size);
      });
  }

  initInfiniteFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.subjectService
      .filterSubjectByCategory(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(size),
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterSubjectByCategory(value, page, size);
      });
  }

  initSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.subjectService
      .searchSubjectByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchSubjectByName(value, page, size);
      });
  }

  initInfiniteSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.subjectService
      .searchSubjectByName(value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            subjectList: new Array<Subject>(size),
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchSubjectByName(value, page, size);
      });
  }

  initSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.subjectService
      .sortSubjectByPrice(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortSubjectByPrice(value, page, size);
      });
  }

  initInfiniteSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.subjectService
      .sortSubjectByPrice(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          subjectList: new Array<Subject>(size),
        });
        console.log('Current flag: sort list');
        console.log(this.state.subjectList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortSubjectByPrice(value, page, size);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.fetchSubject(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.fillEmpty(
            page - 1,
            size,
            this.state.subjectList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.subjectList);
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
    this.subjectService.fetchSubject(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.subjectList);
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

  $subjectList: Observable<Array<Subject>> = this.select(
    (state) => state.subjectList
  );

  $exportData: Observable<Array<Subject>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedSubject: Observable<Object> = this.select(
    (state) => state.selectedSubject
  );

  $subjectInstance: Observable<Subject> = this.select(
    (state) => state.subjectInstance
  );

  uploadSubject(subject: Subject, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.subjectService.uploadSubject(subject).subscribe({
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

  updateSubject(subject: Subject, key: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.subjectService.updateSubject(subject, key).subscribe({
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

  deleteSelectedSubjects(
    selectedSubjects: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.subjectService.deleteSelectedSubjects(selectedSubjects).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.subjectList);
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

  deleteAllSubjects() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.subjectService.deleteAllSubjects().subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setState({ subjectList: [] });
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

  deleteSubject(id: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.subjectService.deleteSubject(id).subscribe({
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

  selectSubject(_subject: Subject) {
    this.setState({ selectedSubject: _subject });
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

  filterSubjectByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.subjectService
      .filterSubjectByPrice(criteria, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
          });
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

  filterSubjectByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.filterSubjectByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
        });
        console.log('Filtered list');
        console.log(this.state.subjectList);
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

  filterInfiniteSubjectByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.filterSubjectByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.state.subjectList.concat(data),
        });
        console.log('Filtered list');
        console.log(this.state.subjectList);
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

  searchSubjectByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.searchSubjectByName(value, page, size).subscribe({
      next: (data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Searched list');
        console.log(this.state.subjectList);
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

  searchInfiniteSubjectByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.searchSubjectByName(value, page, size).subscribe({
      next: (data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            subjectList: this.state.subjectList.concat(data),
          });
        } else {
          this.store.showNotif('No result found!', 'custome');
        }
        console.log('Infite searched list');
        console.log(this.state.subjectList);
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

  sortSubjectByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.sortSubjectByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Sorted list');
        console.log(this.state.subjectList);
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

  sortSubjectByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.sortSubjectByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          subjectList: this.fillEmpty(page, size, this.state.subjectList, data),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Sorted list');
        console.log(this.state.subjectList);
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

  sortInfiniteSubjectByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.subjectService.sortSubjectByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          subjectList: this.state.subjectList.concat(data),
        });
        console.log('Infite sorted list');
        console.log(this.state.subjectList);
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

  getSubject(id: string) {
    this.setIsLoading(true);
    return this.subjectService
      .getSubject(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ subjectInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  getSubjectByMedicalCheckupID(id: string) {
    this.setIsLoading(true);
    return this.subjectService
      .getSubjectByMedicalCheckupID(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ subjectInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<Subject>) {
    this.setState({ subjectList: array });
  }
}
