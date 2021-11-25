import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TestResult } from 'src/app/shared/models/test-result';
import { TestResultStore } from 'src/app/shared/services/test-result/test-result-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { Subject } from 'src/app/shared/models/subject';
import { TestResultHttpService } from 'src/app/shared/services/test-result/test-result-http.service';
import { Test } from 'src/app/shared/models/test';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
export class TestResultComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  testResultList!: Array<TestResult>;

  testResult: TestResult;

  testData: Test;
  subjectList: Array<Subject> = [];
  currentTestResultID!: string;
  pageSize: number = 10;
  pullDown = false;
  updateContentTimer: any;
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;
  isSortingByPrice: boolean;
  isShowTestResult: boolean;

  currentCategoryFilterValue: string;
  timeout: any;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'testId';
  refreshButtonOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.onRefresh.bind(this),
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
    private testResultStore: TestResultStore,
    private testResultHTTP: TestResultHttpService,
    private store: StoreService,
    private router: Router,
    private fileStore: FileStore
  ) {}

  getMetaData() {
    return this.store.$currentTestHistory.subscribe((data: Test) => {
      if (data) {
        this.testData = data;
        this.currentFilterByPropertyValue = data.id;
        this.initData();
      }
    });
  }

  showDetail(testResult: TestResult) {
    this.isShowTestResult = true;
    this.testResult = testResult;
  }

  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.testResultList.length) {
        switch (editorMode) {
          case 'NORMAL':
            this.paginatePureData(currentIndex + 1);
            break;
          case 'FILTER':
            break;
          case 'SEARCH':
            break;
          case 'SORT':
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
    this.testResultStore.filterInfiniteTestResultByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }
  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.testResultStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
  }

  navigateToScheduleList() {
    this.router.navigate(['/schedule_list']);
  }

  sourceDataListener() {
    return this.testResultStore.$testResultList.subscribe(
      (data: Array<any>) => {
        if (data) {
          this.testResultList = data.filter((e: any) => e.isPractice === false);
        }
      }
    );
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
      }
    });
  }

  currentPageListener() {
    return this.testResultStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    this.testResultStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
    this.sourceDataListener();
    this.fileDataListener();
  }

  ngOnInit(): void {
    this.getMetaData();
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.getMetaData().unsubscribe();
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.fileDataListener().unsubscribe();
  }
}
