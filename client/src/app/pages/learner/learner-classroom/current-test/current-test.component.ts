import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/shared/models/test';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { Question } from 'src/app/shared/models/question';
import { DxScrollViewComponent } from 'devextreme-angular';
import { TestRequest } from 'src/app/shared/models/testRequest';
import { TestHttpService } from 'src/app/shared/services/test/test-http.service';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-current-test',
  templateUrl: './current-test.component.html',
  styleUrls: ['./current-test.component.scss'],
})
export class CurrentTestComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  testData: Test;
  pageSize: number = 5;
  totalPages: Array<number> = [];
  totalQuestions: number;
  currentPage: number = 1;

  timeLeft: any;
  testRequest: TestRequest;

  isShowTestResult: boolean = false;

  testResult: any;
  currentUserId: string;

  constructor(
    private testStore: TestStore,

    private testHTTP: TestHttpService,
    private store: StoreService,
    private questionStore: QuestionStore
  ) {}

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentUserId = data;
      }
    });
  }

  saveTest() {}

  submitTest() {
    this.store.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        const newTestRequest: TestRequest = {
          testId: this.testRequest.testId,
          userId: this.currentUserId,
          questionRequest: this.testRequest.questionRequest,
        };
        console.log(newTestRequest);
        this.testHTTP
          .doTest(newTestRequest)
          .toPromise()
          .then((data: any) => {
            this.store.setIsLoading(false);
            console.log(data);
            this.testResult = data;
            this.store.showNotif(`${data.responseMessage}`, 'custom');
            this.isShowTestResult = true;
          });
      }
    });
  }

  testRequestListener() {
    return this.testStore.$testRequest.subscribe((data: TestRequest) => {
      if (data) {
        this.testRequest = data;
        console.log(data);
      }
    });
  }

  timeCounter() {
    let totalSeconds = this.testData?.allocatedTime * 60;
    setInterval(() => {
      totalSeconds--;
      if (totalSeconds >= 0) {
        var time = new Date(totalSeconds * 1000);
        var m: number | string = time.getMinutes();
        m = m < 10 ? '0' + m : m;
        var s: number | string = time.getSeconds();
        s = s < 10 ? `0${s}` : s;
        this.timeLeft = m + ':' + s;
      }
      if (totalSeconds === 0) {
        this.store.showNotif('The test is ended', 'custom');
        this.submitTest();
        clearInterval(totalSeconds);
      }
    }, 1000);
  }

  getMetaData() {
    return this.store.$currentTest.subscribe((data: Test) => {
      if (data) {
        this.testData = data;
        this.testStore.setTestRequestId(this.testData.id);
        this.questionStore
          .initInfiniteFilterByPropertyData(
            'testId',
            this.testData.id,
            1,
            this.pageSize
          )
          .then((data: any) => {
            this.totalQuestions = data.totalRecords;
            this.timeCounter();
            if (data.data) {
              for (let index = 0; index < data.totalPages; index++) {
                this.totalPages.push(index + 1);
              }
            }
          });
      }
    });
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }
  ngOnInit(): void {
    this.getMetaData();
    this.getUserID();
    this.testRequestListener();
  }

  ngOnDestroy(): void {
    this.testRequestListener().unsubscribe();
  }
}
