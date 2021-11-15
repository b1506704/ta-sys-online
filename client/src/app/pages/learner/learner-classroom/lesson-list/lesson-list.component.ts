import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Lesson } from 'src/app/shared/models/lesson';
import { LessonStore } from 'src/app/shared/services/lesson/lesson-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
})
export class LessonListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  lessonList: Array<Lesson> = [];
  currentLessonID!: string;
  currentSelectedLesson!: Lesson;
  pageSize: number = 5;
  pullDown = false;
  updateContentTimer: any;
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;
  isSortingByPrice: boolean;
  isDetailPopupVisible: boolean = false;

  currentCategoryFilterValue: string;
  timeout: any;
  currentFilterByPropertyValue: string;
  currentSearchByPropertyValue: string;
  currentSortByPropertyValue: string;
  currentSortProperty: string = 'createdDate';
  currentSearchProperty: string = 'name';
  currentFilterProperty: string = 'courseId';
  searchBoxOptions: any = {
    valueChangeEvent: 'keyup',
    showClearButton: true,
    onKeyUp: this.onSearchKeyupHandler.bind(this),
    onValueChanged: this.onSearchValueChanged.bind(this),
    mode: 'search',
    placeholder: 'Lesson title...',
  };

  refreshButtonOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.onRefresh.bind(this),
  };

  sortSelectBoxOptions: any = {
    items: [
      {
        _id: '-1',
        name: '(NONE)',
      },
      { _id: '0', name: 'asc' },
      { _id: '1', name: 'desc' },
    ],
    valueExpr: 'name',
    placeholder: 'Sort by date',
    displayExpr: 'name',
    onValueChanged: this.onSortValueChanged.bind(this),
  };

  fileData: File = {
    sourceID: '',
    container: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  fileList: Array<File> = [];

  constructor(
    private lessonStore: LessonStore,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

  showDetail(lesson: Lesson) {
    this.currentSelectedLesson = lesson;
    this.isDetailPopupVisible = true;
  }

  closeDetailPopup = () => {
    this.isDetailPopupVisible = false;
  };

  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.lessonList.length) {
        switch (editorMode) {
          case 'NORMAL':
            this.paginatePureData(currentIndex + 1);
            break;
          case 'FILTER':
            this.paginateFilterData(currentIndex + 1);
            break;
          case 'SEARCH':
            this.paginateSearchData(currentIndex + 1);
            break;
          case 'SORT':
            this.paginateSortData(currentIndex + 1);
            break;
          default:
            break;
        }
      }
      args.component.release();
    }, 500);
  };

  updateTopContent = (e: any) => {
    this.updateContent(e, 'PullDown');
  };
  updateBottomContent = (e: any) => {
    this.updateContent(e, 'ReachBottom');
  };

  onSearchKeyupHandler(e: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isSearchingByName = true;
      this.isFilteringByCategory = false;
      this.isSortingByPrice = false;
      console.log(this.currentSearchByPropertyValue);
      if (this.currentSearchByPropertyValue !== '') {
        this.lessonStore.initInfiniteSearchByPropertyData(
          this.currentSearchProperty,
          this.currentSearchByPropertyValue,
          1,
          this.pageSize
        );
      } else {
        //return to pure editor mode
        //
        this.onRefresh();
      }
    }, 1250);
  }

  onSearchValueChanged(e: any) {
    this.currentSearchByPropertyValue = e.value;
  }

  onSortValueChanged(e: any) {
    this.isSortingByPrice = true;
    this.isSearchingByName = false;
    this.isFilteringByCategory = false;
    this.currentSortByPropertyValue = e.value;
    if (e.value !== '(NONE)') {
      this.lessonStore.initInfiniteSortByPropertyData(
        this.currentSortProperty,
        e.value,
        1,
        this.pageSize
      );
    } else {
      //return to pure editor mode
      //
      this.onRefresh();
    }
  }

  checkEditorMode() {
    if (this.isFilteringByCategory === true) {
      return 'FILTER';
    } else if (this.isSearchingByName === true) {
      return 'SEARCH';
    } else if (this.isSortingByPrice === true) {
      return 'SORT';
    } else {
      return 'NORMAL';
    }
  }

  paginatePureData(index: number) {
    this.lessonStore.filterInfiniteLessonByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateFilterData(index: number) {
    this.lessonStore.filterInfiniteLessonByProperty(
      this.currentFilterProperty,
      this.currentCategoryFilterValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.lessonStore.filterSearchInfiniteLessonByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      this.currentSearchProperty,
      this.currentSearchByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.lessonStore.sortInfiniteLessonByProperty(
      this.currentSortProperty,
      this.currentSortByPropertyValue,
      index,
      this.pageSize
    );
  }

  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.lessonStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
  }

  lessonDataListener() {
    return this.lessonStore.$lessonList.subscribe((data: any) => {
      this.lessonList = data;
      console.log('LESSON VALUE');
      console.log(data);
    });
  }

  mapFileListToUrl(_id: string) {
    if (this.fileList.length !== 0) {
      const fetchedFile = this.fileList.find(
        (e: any) => e.sourceID === _id
      )?.url;
      if (fetchedFile) {
        return fetchedFile;
      } else {
        return this.fileData.url;
      }
    }
    return this.fileData.url;
  }

  fileDataListener() {
    return this.fileStore.$fileList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.fileList = data;
        //
        //
      }
    });
  }

  currentPageListener() {
    return this.lessonStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }
  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    return this.store.$currentCourse.subscribe((data: Course) => {
      if (data !== undefined) {
        this.currentFilterByPropertyValue = data.id;
        this.lessonStore.initInfiniteFilterByPropertyData(
          this.currentFilterProperty,
          this.currentFilterByPropertyValue,
          1,
          this.pageSize
        );
        this.lessonDataListener();
        this.fileDataListener();
      }
    });
  }

  ngOnInit(): void {
    this.initData();
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.initData().unsubscribe();
    this.lessonDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.fileDataListener().unsubscribe();
  }
}
