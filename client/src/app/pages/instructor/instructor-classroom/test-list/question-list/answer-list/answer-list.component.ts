import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer';
import { AnswerStore } from 'src/app/shared/services/answer/answer-store.service';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { AnswerHttpService } from 'src/app/shared/services/answer/answer-http.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() questionId: string;
  answerList: Array<Answer> = [];
  pageSize: number = 100;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'questionId';
  currentUpdatedAnswer!: Answer;
  currentSelectedAnswer!: Answer;
  answerCount: number = 0;
  isUploading: boolean = false;

  isUploadPopupVisible: boolean = false;
  isUpdatePopupVisible: boolean = false;

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
    private answerStore: AnswerStore,
    private fileStore: FileStore,
    private store: StoreService,
    private answerHTTP: AnswerHttpService
  ) {}

  refresh() {
    this.initData();
  }

  updateAnswer(answer: Answer) {
    this.currentUpdatedAnswer = answer;
    this.isUpdatePopupVisible = true;
  }
  isUploadingListener() {
    return this.answerStore.$isUploading.subscribe((data: any) => {
      if (data === false) {
        this.initData();
      }
    });
  }

  deleteAnswer(answer: Answer) {
    this.answerStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.answerHTTP.deleteAnswer([answer.id]).subscribe((data: any) => {
          this.initData();
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
        });
      }
    });
  }

  uploadAnswer() {
    this.isUploadPopupVisible = true;
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

  closePopupUpload = () => {
    this.isUploadPopupVisible = false;
  };

  closePopupUpdate = () => {
    this.isUpdatePopupVisible = false;
  };

  getAnswerCount() {
    this.answerCount = this.answerList.length;
  }

  initData() {
    if (this.questionId) {
      console.log('CURRENT POST ID');
      console.log(this.questionId);
      this.answerStore
        .initInfiniteFilterByPropertyData(
          this.currentFilterProperty,
          this.questionId,
          1,
          this.pageSize
        )
        .then((data: any) => {
          if (data.data) {
            this.answerList = data.data;
            this.answerStore.fetchMediaBySourceID(data.data);
            this.getAnswerCount();
            this.fileDataListener();
          }
        });
    }
  }

  ngOnChanges(): void {
    this.initData();
  }

  ngOnInit(): void {
    this.fileDataListener();
    this.isUploadingListener();
  }

  ngOnDestroy(): void {
    this.fileDataListener().unsubscribe();
    this.isUploadingListener();
  }
}
