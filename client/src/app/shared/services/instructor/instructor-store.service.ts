import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { InstructorHttpService } from './instructor-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { ImageStore } from '../image/image-store.service';

interface InstructorState {
  instructorList: Array<Instructor>;
  exportData: Array<Instructor>;
  instructorInstance: Instructor;
  selectedInstructor: Object;
  roleStatistics: Array<Object>;
  departmentStatistics: Array<Object>;
  genderStatistics: Array<Object>;
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
  roleStatistics: [],
  departmentStatistics: [],
  genderStatistics: [],
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
    private store: StoreService,
    private imageStore: ImageStore
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
    sourceArray: Array<Instructor>,
    addedArray: Array<Instructor>
  ): Array<Instructor> {
    let result: Array<Instructor> = sourceArray;
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

  initData(page: number, size: number) {
    this.instructorService
      .fetchInstructor(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalItems),
        });
        console.log('Current flag: pure list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initInfiniteData(page: number, size: number) {
    this.store.setIsLoading(true);
    return this.instructorService
      .fetchInstructor(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.items.length),
        });
        this.imageStore.fetchSelectedImages(data.items);
        console.log('Current flag: infite list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.loadDataAsync(page, size);

      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.fetchInstructor(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.state.instructorList.concat(data.items),
        });
        this.imageStore.fetchSelectedImages(data.items);
        console.log('Infinite list');
        console.log(this.state.instructorList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        // this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  initFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.instructorService
      .filterInstructorByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalItems),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterInstructorByCategory(value, page, size);
      });
  }

  initInfiniteFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.instructorService
      .filterInstructorByCategory(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.items.length),
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterInstructorByCategory(value, page, size);
      });
  }

  initSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.instructorService
      .searchInstructorByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalItems),
        });
        console.log('Current flag: searched list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchInstructorByName(value, page, size);
      });
  }

  initInfiniteSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.instructorService
      .searchInstructorByName(value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalItems !== 0) {
          this.setState({
            instructorList: new Array<Instructor>(data.items.length),
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchInstructorByName(value, page, size);
      });
  }

  initSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.instructorService
      .sortInstructorByPrice(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortInstructorByPrice(value, page, size);
      });
  }

  initInfiniteSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.instructorService
      .sortInstructorByPrice(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.items.length),
        });
        console.log('Current flag: sort list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortInstructorByPrice(value, page, size);
      });
  }

  initSortByName(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.instructorService
      .sortInstructorByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: new Array<Instructor>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortInstructorByName(value, page, size);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.fetchInstructor(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.fillEmpty(
            page,
            size,
            this.state.instructorList,
            data.items
          ),
        });
        console.log('Pure list');
        console.log(this.state.instructorList);
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
    this.instructorService.fetchInstructor(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.fillEmpty(
            page,
            size,
            this.state.instructorList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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

  $departmentStatistics: Observable<Array<Object>> = this.select(
    (state) => state.departmentStatistics
  );

  $roleStatistics: Observable<Array<Object>> = this.select(
    (state) => state.roleStatistics
  );

  $genderStatistics: Observable<Array<Object>> = this.select(
    (state) => state.genderStatistics
  );

  $exportData: Observable<Array<Instructor>> = this.select(
    (state) => state.exportData
  );

  $instructorInstance: Observable<Instructor> = this.select(
    (state) => state.instructorInstance
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedInstructor: Observable<Object> = this.select(
    (state) => state.selectedInstructor
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

  updateInstructor(instructor: Instructor, key: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.instructorService.updateInstructor(instructor, key).subscribe({
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
        this.instructorService.deleteSelectedInstructors(selectedInstructors).subscribe({
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

  deleteAllInstructors() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.instructorService.deleteAllInstructors().subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setState({ instructorList: [] });
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

  deleteInstructor(id: string, page: number, size: number) {
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

  getInstructorByUserName(username: string) {
    this.setIsLoading(true);
    return this.instructorService
      .getInstructorByUserName(username)
      .toPromise()
      .then((data: any) => {
        this.setState({ instructorInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  filterInstructorByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.instructorService
      .filterInstructorByPrice(criteria, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            instructorList: this.fillEmpty(
              page,
              size,
              this.state.instructorList,
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

  filterInstructorByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.filterInstructorByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.fillEmpty(
            page,
            size,
            this.state.instructorList,
            data.items
          ),
        });
        console.log('Filtered list');
        console.log(this.state.instructorList);
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

  filterInfiniteInstructorByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.filterInstructorByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.state.instructorList.concat(data.items),
        });
        console.log('Filtered list');
        console.log(this.state.instructorList);
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

  searchInstructorByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.searchInstructorByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.fillEmpty(
            page,
            size,
            this.state.instructorList,
            data.items
          ),
        });
        console.log('Searched list');
        console.log(this.state.instructorList);
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

  searchInfiniteInstructorByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.searchInstructorByName(value, page, size).subscribe({
      next: (data: any) => {
        if (data.totalItems !== 0) {
          this.setState({
            instructorList: this.state.instructorList.concat(data.items),
          });
        } else {
          this.store.showNotif('No result found!', 'custome');
        }
        console.log('Infite searched list');
        console.log(this.state.instructorList);
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

  sortInstructorByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.sortInstructorByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          instructorList: this.fillEmpty(
            page,
            size,
            this.state.instructorList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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

  sortInstructorByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.sortInstructorByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          instructorList: this.fillEmpty(
            page,
            size,
            this.state.instructorList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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

  sortInfiniteInstructorByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.instructorService.sortInstructorByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          instructorList: this.state.instructorList.concat(data.items),
        });
        console.log('Infite sorted list');
        console.log(this.state.instructorList);
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

  getRoleCount(value: string) {
    this.store.setIsLoading(true);
    return this.instructorService
      .filterInstructorByRole(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          roleStatistics: this.state.roleStatistics.concat({
            role: value,
            totalCount: data.totalItems,
          }),
        });
        this.store.setIsLoading(false);
      });
  }

  getRoleStatistics() {
    const roleList = ['Instructor', 'Nurses', 'Assistants'];
    this.setState({ roleStatistics: [] });
    roleList.forEach((element) => {
      this.getRoleCount(element);
    });
  }

  getDepartmentCount(value: string) {
    this.store.setIsLoading(true);
    return this.instructorService
      .filterInstructorByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          departmentStatistics: this.state.departmentStatistics.concat({
            department: value,
            totalCount: data.totalItems,
          }),
        });
        this.store.setIsLoading(false);
      });
  }

  getDepartmentStatistics() {
    const departmentList = [
      'Dermatology',
      'Oncology',
      'Endocrinology',
      'Gastroenterology',
      'Hepato-Biliary-Pancreatic',
      'Neurology',
      'Respiratory',
      'Infectious',
      'Ophthalmology',
    ];
    this.setState({ departmentStatistics: [] });
    departmentList.forEach((element) => {
      this.getDepartmentCount(element);
    });
  }

  getGenderCount(value: string) {
    this.store.setIsLoading(true);
    return this.instructorService
      .filterInstructorByGender(value, 0, 5)
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

  setExportData(array: Array<Instructor>) {
    this.setState({ instructorList: array });
  }
}
