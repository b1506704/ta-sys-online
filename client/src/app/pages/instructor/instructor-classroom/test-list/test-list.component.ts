import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/shared/models/test';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { TestHttpService } from 'src/app/shared/services/test/test-http.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  testList!: Array<Test>;
  currentTestID!: string;
  currentUpdatedTest!: Test;
  currentSelectedTest!: Test;
  pageSize: number = 5;
  pullDown = false;
  updateContentTimer: any;
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;
  isSortingByPrice: boolean;
  isUploadPopupVisible: boolean = false;
  isUpdatePopupVisible: boolean = false;
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
    placeholder: 'Test title...',
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
    private testStore: TestStore,
    private testHTTP: TestHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

  uploadTest() {
    this.isUploadPopupVisible = true;
  }

  updateTest(test: Test) {
    this.currentUpdatedTest = test;
    this.isUpdatePopupVisible = true;
  }

  deleteTest(test: Test) {
    this.testStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.testHTTP.deleteTest([test.id]).subscribe((data: any) => {
          this.initData();
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
        });
      }
    });
  }

  showDetail(test: Test) {
    this.currentSelectedTest = test;
    this.isDetailPopupVisible = true;
  }

  closePopupUpload = () => {
    this.isUploadPopupVisible = false;
  };

  closePopupUpdate = () => {
    this.isUpdatePopupVisible = false;
  };

  closeDetailPopup = () => {
    this.isDetailPopupVisible = false;
  };

  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.testList.length) {
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
        this.testStore.initInfiniteFilterSearchByPropertyData(
          this.currentFilterProperty,
          this.currentFilterByPropertyValue,
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
      this.testStore.initInfiniteSortByPropertyData(
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
    this.testStore.filterInfiniteTestByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateFilterData(index: number) {
    this.testStore.filterInfiniteTestByProperty(
      this.currentFilterProperty,
      this.currentCategoryFilterValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.testStore.filterSearchInfiniteTestByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      this.currentSearchProperty,
      this.currentSearchByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.testStore.sortInfiniteTestByProperty(
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
    this.testStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
  }

  testDataListener() {
    return this.testStore.$testList.subscribe((data: any) => {
      this.testList = data;
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
    return this.testStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  isUploadingListener() {
    return this.testStore.$isUploading.subscribe((data: boolean) => {
      if (data === false) {
        this.initData();
      }
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    return this.store.$currentCourse.subscribe((data: Course) => {
      if (data !== undefined) {
        this.currentFilterByPropertyValue = data.id;
        this.testStore.initInfiniteFilterByPropertyData(
          this.currentFilterProperty,
          this.currentFilterByPropertyValue,
          1,
          this.pageSize
        );
        this.testDataListener();
        this.fileDataListener();
      }
    });
  }

  ngOnInit(): void {
    this.isUploadingListener();
    this.initData();
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.initData().unsubscribe();
    this.testDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.fileDataListener().unsubscribe();
    this.isUploadingListener().unsubscribe();
  }
}
