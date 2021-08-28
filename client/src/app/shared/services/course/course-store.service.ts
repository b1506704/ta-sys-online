import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { CourseHttpService } from './course-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { MedicalCheckupStore } from '../medical-checkup/medical-checkup-store.service';

interface CourseState {
  courseList: Array<Course>;
  exportData: Array<Course>;
  selectedCourse: Object;
  courseInstance: Course;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: String;
}
const initialState: CourseState = {
  courseList: [],
  selectedCourse: {},
  courseInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class CourseStore extends StateService<CourseState> {
  constructor(
    private courseService: CourseHttpService,
    private store: StoreService,
    private medicalCheckupService: MedicalCheckupStore
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
    sourceArray: Array<Course>,
    addedArray: Array<Course>
  ): Array<Course> {
    let result: Array<Course> = sourceArray;
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

  initInfiniteData(page: number, size: number) {
    return this.courseService
      .fetchCourse(page, size)
      .toPromise()
      .then((data: any) => {
        if (page === 0) {
          this.setState({
            courseList: new Array<Course>(size),
          });
        } else {
          this.setState({
            courseList: new Array<Course>(page * size),
          });
        }
        console.log('Current flag: infite list');
        console.log(this.state.courseList);
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
    this.courseService.fetchCourse(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          courseList: this.state.courseList.concat(data.items),
        });
        console.log('Infinite list');
        console.log(this.state.courseList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.errorMessage, 'error');
        console.log(data);
      },
    });
  }

  loadDataAsyncByLearnerID(page: number, size: number, learnerID: string) {
    this.setIsLoading(true);
    this.courseService
      .fetchCourseByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            courseList: this.fillEmpty(
              page,
              size,
              this.state.courseList,
              data.items
            ),
          });
          console.log('Pure list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  initInfiniteDataByLearnerID(
    page: number,
    size: number,
    learnerID: string
  ) {
    return this.courseService
      .fetchCourseByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(data.items.length),
        });
        console.log('Current flag: infite list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
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
    this.courseService
      .fetchCourseByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            courseList: this.state.courseList.concat(data.items),
          });
          console.log('Infinite list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  initData(page: number, size: number) {
    this.courseService
      .fetchCourse(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(data.totalItems),
        });
        console.log('Current flag: pure list');
        console.log(this.state.courseList);
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
    this.courseService
      .filterCourseByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(data.totalItems),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterCourseByCategory(value, page, size);
      });
  }

  initInfiniteFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.courseService
      .filterCourseByCategory(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(size),
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterCourseByCategory(value, page, size);
      });
  }

  initSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.courseService
      .searchCourseByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(data.totalItems),
        });
        console.log('Current flag: searched list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchCourseByName(value, page, size);
      });
  }

  initInfiniteSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.courseService
      .searchCourseByName(value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalItems !== 0) {
          this.setState({
            courseList: new Array<Course>(size),
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchCourseByName(value, page, size);
      });
  }

  initSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.courseService
      .sortCourseByPrice(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortCourseByPrice(value, page, size);
      });
  }

  initInfiniteSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.courseService
      .sortCourseByPrice(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          courseList: new Array<Course>(size),
        });
        console.log('Current flag: sort list');
        console.log(this.state.courseList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortCourseByPrice(value, page, size);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.courseService.fetchCourse(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          courseList: this.fillEmpty(
            page,
            size,
            this.state.courseList,
            data.items
          ),
        });
        console.log('Pure list');
        console.log(this.state.courseList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.errorMessage, 'error');
        console.log(data);
      },
    });
  }

  refresh(page: number, size: number) {
    this.setIsLoading(true);
    this.courseService.fetchCourse(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          courseList: this.fillEmpty(
            page,
            size,
            this.state.courseList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        console.log('Pure list');
        console.log(this.state.courseList);
        console.log('Server response');
        console.log(data);
        this.store.showNotif('Refresh successfully', 'custom');
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.errorMessage, 'error');
        console.log(data);
      },
    });
  }

  setIsLoading(_isLoading: Boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $courseList: Observable<Array<Course>> = this.select(
    (state) => state.courseList
  );

  $exportData: Observable<Array<Course>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedCourse: Observable<Object> = this.select(
    (state) => state.selectedCourse
  );

  $courseInstance: Observable<Course> = this.select(
    (state) => state.courseInstance
  );

  uploadCourse(course: Course, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.courseService.uploadCourse(course).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems + 1);
            console.log(data);
            this.loadDataAsync(page, size);
            this.medicalCheckupService
              .initCompleteInfiniteData(page, size)
              .then(() => {
                // this.medicalCheckupService.setIsCourseDone(true);
              });
            this.setIsLoading(false);
            this.store.showNotif(data.message, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.errorMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  updateCourse(
    course: Course,
    key: string,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.courseService
          .updateCourse(course, key)
          .subscribe({
            next: (data: any) => {
              this.setState({ responseMsg: data });
              console.log(data);
              this.loadDataAsync(page, size);
              this.medicalCheckupService.initCompleteInfiniteData(page, size);
              this.setIsLoading(false);
              this.store.showNotif(data.message, 'custom');
            },
            error: (data: any) => {
              this.setIsLoading(false);
              this.store.showNotif(data.error.errorMessage, 'error');
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

  deleteSelectedCourses(
    selectedCourses: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.courseService
          .deleteSelectedCourses(selectedCourses)
          .subscribe({
            next: (data: any) => {
              this.setState({ responseMsg: data });
              console.log(data);
              this.loadDataAsync(page, size);
              console.log(this.state.courseList);
              this.setIsLoading(false);
              this.store.showNotif(data.message, 'custom');
            },
            error: (data: any) => {
              this.setIsLoading(false);
              this.store.showNotif(data.error.errorMessage, 'error');
              console.log(data);
            },
          });
      }
    });
  }

  deleteAllCourses() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.courseService.deleteAllCourses().subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setState({ courseList: [] });
            this.setState({ totalPages: 0 });
            this.setState({ currentPage: 0 });
            this.setState({ totalItems: 0 });
            console.log(data);
            this.setIsLoading(false);
            this.store.showNotif(data.message, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.errorMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  deleteCourse(id: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.courseService.deleteCourse(id).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems - 1);
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.message, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.errorMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  selectCourse(_course: Course) {
    this.setState({ selectedCourse: _course });
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

  filterCourseByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.courseService
      .filterCourseByPrice(criteria, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            courseList: this.fillEmpty(
              page,
              size,
              this.state.courseList,
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
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  filterCourseByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.courseService
      .filterCourseByCategory(value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            courseList: this.fillEmpty(
              page,
              size,
              this.state.courseList,
              data.items
            ),
          });
          console.log('Filtered list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  filterInfiniteCourseByCategory(
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.courseService
      .filterCourseByCategory(value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            courseList: this.state.courseList.concat(data.items),
          });
          console.log('Filtered list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  searchCourseByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.courseService
      .searchCourseByName(value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalItems !== 0) {
            this.setState({
              courseList: this.fillEmpty(
                page,
                size,
                this.state.courseList,
                data.items
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  searchInfiniteCourseByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.courseService
      .searchCourseByName(value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalItems !== 0) {
            this.setState({
              courseList: this.state.courseList.concat(data.items),
            });
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  sortCourseByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.courseService
      .sortCourseByName(value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            courseList: this.fillEmpty(
              page,
              size,
              this.state.courseList,
              data.items
            ),
          });
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          console.log('Sorted list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  sortCourseByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.courseService
      .sortCourseByPrice(value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            courseList: this.fillEmpty(
              page,
              size,
              this.state.courseList,
              data.items
            ),
          });
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          console.log('Sorted list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  sortInfiniteCourseByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.courseService
      .sortCourseByPrice(value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            courseList: this.state.courseList.concat(data.items),
          });
          console.log('Infite sorted list');
          console.log(this.state.courseList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalItems });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.currentPage });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.errorMessage, 'error');
          console.log(data);
        },
      });
  }

  getCourse(id: string) {
    this.setIsLoading(true);
    return this.courseService
      .getCourse(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ courseInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  getCourseByMedicalCheckupID(id: string) {
    this.setIsLoading(true);
    return this.courseService
      .getCourseByMedicalCheckupID(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ courseInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<Course>) {
    this.setState({ courseList: array });
  }
}
