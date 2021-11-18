import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/models/answer';
import { AnswerStore } from 'src/app/shared/services/answer/answer-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

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
  currentSelectedAnswer!: Answer;
  constructor(private answerStore: AnswerStore, private store: StoreService) {}

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

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
