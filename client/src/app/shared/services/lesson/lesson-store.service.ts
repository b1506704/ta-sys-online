import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { LessonHttpService } from './lesson-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { FileStore } from '../file/file-store.service';

interface LessonState {
  lessonList: Array<Lesson>;
  exportData: Array<Lesson>;
  selectedLesson: Object;
  lessonInstance: Lesson;
  isUploading: boolean;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: LessonState = {
  lessonList: [],
  selectedLesson: {},
  lessonInstance: undefined,
  isUploading: undefined,
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
    private store: StoreService,
    private fileStore: FileStore
  ) {
    super(initialState);
  }
  //
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<Lesson>,
    addedArray: Array<Lesson>
  ): Array<Lesson> {
    let result: Array<Lesson> = sourceArray;
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

  initData(page: number, size: number) {
    this.lessonService
      .fetchLesson(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.lessonList);
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
    this.lessonService
      .filterLessonByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalRecords),
        });

        console.log('Current flag: filtered list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterLessonByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.lessonService
      .filterLessonByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: data.data,
        });
        // this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infinite filtered list');
        console.log(this.state.lessonList);
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
    this.lessonService
      .searchLessonByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchLessonByProperty(property, value, page, size);
      });
  }

  initInfiniteSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //
    this.lessonService
      .searchLessonByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            lessonList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.lessonList);
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
    this.lessonService
      .filterSearchLessonByProperty(
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
            lessonList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.lessonList);
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
    this.lessonService
      .sortLessonByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: new Array<Lesson>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortLessonByProperty(value, order, page, size);
      });
  }

  initInfiniteSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.lessonService
      .sortLessonByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          lessonList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: sort list');
        console.log(this.state.lessonList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.lessonService.fetchLesson(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          lessonList: this.fillEmpty(
            page - 1,
            size,
            this.state.lessonList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.lessonList);
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
  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $lessonList: Observable<Array<Lesson>> = this.select(
    (state) => state.lessonList
  );

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $isUploading: Observable<boolean> = this.select((state) => state.isUploading);

  $lessonInstance: Observable<Lesson> = this.select(
    (state) => state.lessonInstance
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

  updateLesson(lesson: Lesson, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.updateLesson(lesson).subscribe({
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

  deleteAll() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.lessonService.deleteAll().subscribe({
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

  deleteLesson(id: Array<string>, page: number, size: number) {
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

  setTotalItems(_totalItems: number) {
    this.setState({ totalItems: _totalItems });
  }

  filterLessonByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .filterLessonByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              lessonList: this.fillEmpty(
                page - 1,
                size,
                this.state.lessonList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.lessonList);
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

  filterInfiniteLessonByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .filterLessonByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              lessonList: this.state.lessonList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Filtered list');
          console.log(this.state.lessonList);
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

  filterSearchInfiniteLessonByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .filterSearchLessonByProperty(
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
                lessonList: this.state.lessonList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Infite searched list');
          console.log(this.state.lessonList);
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

  searchLessonByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .searchLessonByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              lessonList: this.fillEmpty(
                page - 1,
                size,
                this.state.lessonList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.lessonList);
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
  sortLessonByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .sortLessonByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            lessonList: this.fillEmpty(
              page - 1,
              size,
              this.state.lessonList,
              data.data
            ),
          });
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          console.log('Sorted list');
          console.log(this.state.lessonList);
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

  sortInfiniteLessonByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.lessonService
      .sortLessonByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              lessonList: this.state.lessonList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Infite sorted list');
          console.log(this.state.lessonList);
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

  setIsUploading(isUploading: boolean) {
    this.setState({ isUploading: isUploading });
  }

  setExportData(array: Array<Lesson>) {
    this.setState({ lessonList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
