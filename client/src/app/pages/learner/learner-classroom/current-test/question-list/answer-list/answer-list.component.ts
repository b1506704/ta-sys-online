import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer';
import { Question } from 'src/app/shared/models/question';
import { AnswerStore } from 'src/app/shared/services/answer/answer-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
interface Dictionary<T> {
  [Key: string]: T;
}

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})
export class AnswerListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() questionId: string;

  @Input() question: Question;
  answerList: Array<Answer> = [];

  // answerIds: Array<string> = [];
  answerIds: Dictionary<string> = {};
  pageSize: number = 100;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'questionId';
  currentSelectedAnswer!: Answer;
  constructor(
    private answerStore: AnswerStore,
    private store: StoreService,
    private testStore: TestStore
  ) {}

  submitAnswer(answer: Answer) {
    const question = this.question;
    question.answerRequests = [answer];
    this.testStore.addAnswerIds(answer.id, question.id);
    this.testStore.addQuestionToTestRequest(question);
  }

  findSelectedAnswerId(id: String) {
    // return this.answerIds.find((e: any) => e === id);
    return this.answerIds[this.question.id] === id;
  }

  answerIdsListener() {
    return this.testStore.$saveAnswerIds.subscribe((data: any) => {
      if (data) {
        this.answerIds = data;
        console.log(this.answerIds);
      }
    });
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
          }
        });
    }
  }

  ngOnChanges(): void {
    this.initData();
  }

  ngOnInit(): void {
    this.answerIdsListener();
  }

  ngOnDestroy(): void {
    this.answerIdsListener().unsubscribe();
  }
}
