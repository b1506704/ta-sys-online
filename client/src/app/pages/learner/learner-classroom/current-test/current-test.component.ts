import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Test } from 'src/app/shared/models/test';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router } from '@angular/router';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { Question } from 'src/app/shared/models/question';
import { DxScrollViewComponent } from 'devextreme-angular';

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

  savedQuestions: Array<Question> = [];

  currentPage: number = 1;

  constructor(
    private testStore: TestStore,
    private store: StoreService,
    private router: Router,
    private questionStore: QuestionStore
  ) {}

  getMetaData() {
    return this.store.$currentTest.subscribe((data: Test) => {
      if (data) {
        this.testData = data;
        this.questionStore
          .initInfiniteFilterByPropertyData(
            'testId',
            this.testData.id,
            1,
            this.pageSize
          )
          .then((data: any) => {
            if (data.data) {
              for (let index = 0; index < data.totalPages; index++) {
                this.totalPages.push(index + 1);
              }
            }
          });
      }
    });
  }

  savedQuestionsListener() {
    this.store.$savedQuestions.subscribe((data: any) => {
      if (data) {
        this.savedQuestions = data;
      }
    });
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }
  ngOnInit(): void {
    this.getMetaData();
  }

  ngOnDestroy(): void {}
}
