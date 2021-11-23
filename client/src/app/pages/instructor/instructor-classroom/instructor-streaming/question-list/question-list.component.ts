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
import { Question } from 'src/app/shared/models/question';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-question-list',
  templateUrl: 'question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxTextBoxComponent, { static: false })
  dxTextBox: DxTextBoxComponent;
  @Input() isVisible: boolean;
  @Input() title: string;
  @Input() testId: string;
  @Input() insertQuiz: (quiz: any, type: string, thumbnail: string) => void;
  @Input() closePopupQuestion: () => void;
  questionList!: Array<Question>;
  pageSize: number = 20;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'testId';
  currentSearchByPropertyValue: string;
  currentSearchProperty: string = 'content';
  currentQuestionOutput: string = '';
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

  constructor(
    private questionStore: QuestionStore,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

  exportQuestion(e: any) {
    const thumbnail = this.mapFileListToUrl(e.id);
    const questionWithTestId = { question: e, testId: this.testId };
    // console.log(e);
    this.insertQuiz(questionWithTestId, 'question', thumbnail);
  }

  checkEditorMode() {
    if (this.isSearchingByName === true) {
      return 'SEARCH';
    } else {
      return 'NORMAL';
    }
  }

  paginatePureData(index: number) {
    this.questionStore.filterInfiniteQuestionByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.questionStore.filterSearchInfiniteQuestionByProperty(
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
    this.questionStore.initInfiniteFilterByPropertyData(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      1,
      this.pageSize
    );
  }

  sourceDataListener() {
    return this.questionStore.$questionList.subscribe((data: any) => {
      if (data) {
        this.questionList = data;
        for (let i = 0; i < data.length; i++) {
          const e = data[i];
          this.exportQuestion(e);
        }
      }
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
    return this.questionStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.dxScrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    this.questionStore.initInfiniteFilterByPropertyDataForStream(
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
      if (this.questionList.length) {
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
        this.questionStore.initInfiniteFilterSearchByPropertyData(
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
    // this.initData();
    this.currentPageListener();
  }

  ngOnChanges() {
    this.currentFilterByPropertyValue = this.testId;
    if (this.testId) {
      this.initData();
    }
    console.log(this.testId);
  }

  ngOnDestroy() {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
  }
}

export class QuestionMessageListModule {}
