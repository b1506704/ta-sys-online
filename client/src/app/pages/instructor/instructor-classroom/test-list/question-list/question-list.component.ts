import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models/question';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { QuestionHttpService } from 'src/app/shared/services/question/question-http.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() testId!: string;
  questionList: Array<Question> = [];
  pageSize: number = 100;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'testId';
  currentUpdatedQuestion!: Question;
  currentSelectedQuestion!: Question;
  questionCount: number = 0;

  isCreatePopupVisible: boolean = false;

  isUpdatePopupVisible: boolean = false;
  isCreating: boolean = false;

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
    private questionStore: QuestionStore,
    private fileStore: FileStore,
    private store: StoreService,
    private questionHTTP: QuestionHttpService
  ) {}

  refresh() {
    this.initData();
  }

  updateQuestion(question: Question) {
    this.currentUpdatedQuestion = question;
    this.store.setCurrentQuestionId(question.id);
    console.log('UPDATED QUESTION');
    console.log('UPDATED QUESTION');
    setTimeout(() => {
      this.isUpdatePopupVisible = true;
    }, 200);
  }

  deleteQuestion(question: Question) {
    this.questionStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.questionHTTP
          .deleteQuestion([question.id])
          .subscribe((data: any) => {
            this.initData();
            this.store.showNotif(`${data.responseMessage}`, 'custom');
            this.store.setIsLoading(false);
          });
      }
    });
  }

  uploadQuestion() {
    this.isCreatePopupVisible = true;
  }

  isCreatingListener() {
    return this.questionStore.$isCreating.subscribe((data: any) => {
      if (data === false) {
        this.initData();
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

  closePopupCreate = () => {
    this.isCreatePopupVisible = false;
  };

  closePopupUpdate = () => {
    this.isUpdatePopupVisible = false;
  };

  getQuestionCount() {
    this.questionCount = this.questionList.length;
  }

  initData() {
    if (this.testId) {
      console.log('CURRENT POST ID');
      console.log(this.testId);
      this.questionStore
        .initInfiniteFilterByPropertyData(
          this.currentFilterProperty,
          this.testId,
          1,
          this.pageSize
        )
        .then((data: any) => {
          if (data.data) {
            this.questionList = data.data;
            // this.questionStore.fetchMediaBySourceID(data.data);
            this.getQuestionCount();
            // this.fileDataListener();
          }
        });
    }
  }

  ngOnChanges(): void {
    this.initData();
  }

  ngOnInit(): void {
    this.fileDataListener();
    this.isCreatingListener();
  }

  ngOnDestroy(): void {
    this.fileDataListener().unsubscribe();
    this.isCreatingListener().unsubscribe();
  }
}
