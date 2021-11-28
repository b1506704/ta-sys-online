import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { DxScrollViewComponent, DxTextBoxComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { Test } from 'src/app/shared/models/test';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { TestStore } from 'src/app/shared/services/test/test-store.service';

@Component({
  selector: 'app-test-list',
  templateUrl: 'test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxTextBoxComponent, { static: false })
  dxTextBox: DxTextBoxComponent;
  @Input() isVisible: boolean;
  @Input() title: string;
  @Input() courseId: string;
  @Input() insertQuiz: (quiz: any, type: string, thumbnail: string) => void;
  @Input() closePopupTest: () => void;
  testList!: Array<Test>;
  pageSize: number = 100;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'courseId';
  currentSearchByPropertyValue: string;
  currentSearchProperty: string = 'name';
  currentTestOutput: string = '';
  currentTestId: string = '';

  currentQuestionTestId: string = '';
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  pullDown = false;
  timeout: any;
  updateContentTimer: any;
  currentIndexFromServer: number;

  fileData: File = {
    sourceID: '',
    container: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../quizs/imgs/profile.png',
  };
  fileList: Array<File> = [];

  isPopupQuestionVisible: boolean;

  constructor(
    private testStore: TestStore,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

  openPopupQuestion() {
    this.isPopupQuestionVisible = true;
  }

  closePopupQuestion = () => {
    this.isPopupQuestionVisible = false;
  };

  selectTest(e: any) {
    this.currentTestId = e.id;
    this.openPopupQuestion();
  }  

  checkEditorMode() {
    if (this.isSearchingByName === true) {
      return 'SEARCH';
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

  onRefresh() {
    this.isSearchingByName = false;
    this.testStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
  }

  sourceDataListener() {
    return this.testStore.$testList.subscribe((data: any) => {
      // if (data) {
      this.testList = data;
      if (data.length) {
        this.currentTestId = data[0].id;
      }
      // }
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

  scrollTop() {
    this.dxScrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    this.testStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
    this.sourceDataListener();
    this.fileDataListener();
  }

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
          case 'SEARCH':
            this.paginateSearchData(currentIndex + 1);
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

  ngOnInit() {
    this.initData();
    this.currentPageListener();
  }

  ngOnChanges() {
    this.currentFilterByPropertyValue = this.courseId;
  }

  ngOnDestroy() {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
  }
}

export class TestMessageListModule {}
