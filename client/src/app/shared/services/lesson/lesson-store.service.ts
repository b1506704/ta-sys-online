import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lesson } from '../../models/lesson';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { LessonHttpService } from './lesson-http.service';
import { confirm } from 'devextreme/ui/dialog';

interface LessonState {
  lessonList: Array<Lesson>;
  exportData: Array<Lesson>;
  selectedLesson: Object;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: String;
}
const initialState: LessonState = {
  lessonList: [],
  selectedLesson: {},
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class LessonStore extends StateService<LessonState> {
  constructor(
    private lessonService: LessonHttpService,
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
    sourceArray: Array<Lesson>,
    addedArray: Array<Lesson>
  ): Array<Lesson> {
    let result: Array<Lesson> = sourceArray;
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
    this.lessonService
      .fetchLesson(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalItems),
        });
        console.log('Current flag: pure list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initInfiniteData(page: number, size: number) {
    return this.lessonService
      .fetchLesson(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.items.length),
        });

        console.log('Current flag: infite list');
        console.log(this.state.lessonList);
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
    this.lessonService.fetchLesson(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.state.lessonList.concat(data.items),
        });
        console.log('Infinite list');
        console.log(this.state.lessonList);
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

  initFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.lessonService
      .filterLessonByCategory(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalItems),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterLessonByCategory(value, page, size);
      });
  }

  initInfiniteFilterByCategoryData(value: string, page: number, size: number) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.lessonService
      .filterLessonByCategory(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.items.length),
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.filterLessonByCategory(value, page, size);
      });
  }

  initSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.lessonService
      .searchLessonByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalItems),
        });
        console.log('Current flag: searched list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchLessonByName(value, page, size);
      });
  }

  initInfiniteSearchByNameData(value: string, page: number, size: number) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.lessonService
      .searchLessonByName(value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalItems !== 0) {
          this.setState({
            lessonList: new Array<Lesson>(data.items.length),
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.searchLessonByName(value, page, size);
      });
  }

  initSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.lessonService
      .sortLessonByPrice(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortLessonByPrice(value, page, size);
      });
  }

  initSortByName(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.lessonService
      .sortLessonByName(value, 0, 5)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalItems),
        });
        console.log('Current flag: sort list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortLessonByName(value, page, size);
      });
  }

  initInfiniteSortByPriceData(value: string, page: number, size: number) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.lessonService
      .sortLessonByPrice(value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.items.length),
        });
        console.log('Current flag: sort list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
      })
      .then(() => {
        this.sortLessonByPrice(value, page, size);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.fetchLesson(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.fillEmpty(
            page,
            size,
            this.state.lessonList,
            data.items
          ),
        });
        console.log('Pure list');
        console.log(this.state.lessonList);
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
    this.lessonService.fetchLesson(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.fillEmpty(
            page,
            size,
            this.state.lessonList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        console.log('Pure list');
        console.log(this.state.lessonList);
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

  $lessonList: Observable<Array<Lesson>> = this.select(
    (state) => state.lessonList
  );

  $exportData: Observable<Array<Lesson>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedLesson: Observable<Object> = this.select(
    (state) => state.selectedLesson
  );

  uploadLesson(lesson: Lesson, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.uploadLesson(lesson).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems + 1);
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

  updateLesson(lesson: Lesson, key: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.updateLesson(lesson, key).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
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

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  deleteSelectedLessons(
    selectedLessons: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.deleteSelectedLessons(selectedLessons).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.lessonList);
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

  deleteAllLessons() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.deleteAllLessons().subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setState({ lessonList: [] });
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

  deleteLesson(id: string, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.deleteLesson(id).subscribe({
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

  selectLesson(_lesson: Lesson) {
    this.setState({ selectedLesson: _lesson });
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

  getLesson(id: string | number) {
    return this.$lessonList.pipe(
      map(
        (lessons: Array<Lesson>) =>
          lessons.find((lesson) => lesson._id === id)!
      )
    );
  }

  filterLessonByPrice(
    criteria: string,
    value: number,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .filterLessonByPrice(criteria, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            lessonList: this.fillEmpty(
              page,
              size,
              this.state.lessonList,
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

  filterLessonByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.filterLessonByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.fillEmpty(
            page,
            size,
            this.state.lessonList,
            data.items
          ),
        });
        console.log('Filtered list');
        console.log(this.state.lessonList);
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

  filterInfiniteLessonByCategory(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.filterLessonByCategory(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.state.lessonList.concat(data.items),
        });
        console.log('Filtered list');
        console.log(this.state.lessonList);
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

  searchLessonByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.searchLessonByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.fillEmpty(
            page,
            size,
            this.state.lessonList,
            data.items
          ),
        });
        console.log('Searched list');
        console.log(this.state.lessonList);
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

  searchInfiniteLessonByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.searchLessonByName(value, page, size).subscribe({
      next: (data: any) => {
        if (data.totalItems !== 0) {
          this.setState({
            lessonList: this.state.lessonList.concat(data.items),
          });
        } else {
          this.store.showNotif('No result found!', 'custome');
        }
        console.log('Infite searched list');
        console.log(this.state.lessonList);
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

  sortLessonByName(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.sortLessonByName(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          lessonList: this.fillEmpty(
            page,
            size,
            this.state.lessonList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        console.log('Sorted list');
        console.log(this.state.lessonList);
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

  sortLessonByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.sortLessonByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          lessonList: this.fillEmpty(
            page,
            size,
            this.state.lessonList,
            data.items
          ),
        });
        this.setState({ totalItems: data.totalItems });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.currentPage });
        console.log('Sorted list');
        console.log(this.state.lessonList);
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

  sortInfiniteLessonByPrice(value: string, page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.sortLessonByPrice(value, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.state.lessonList.concat(data.items),
        });
        console.log('Infite sorted list');
        console.log(this.state.lessonList);
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

  setExportData(array: Array<Lesson>) {
    this.setState({ lessonList: array });
  }
}
