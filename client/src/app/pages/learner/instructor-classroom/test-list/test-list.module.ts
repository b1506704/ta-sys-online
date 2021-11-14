import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListRoutingModule } from './test-list-routing.module';
import { TestListComponent } from './test-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxHtmlEditorModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { UploadTestComponent } from './upload-test/upload-test.component';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { UpdateTestComponent } from './update-test/update-test.component';
import { UploadQuestionComponent } from './question-list/upload-question/upload-question.component';
import { UpdateQuestionComponent } from './question-list/update-question/update-question.component';
import { AnswerListComponent } from './question-list/answer-list/answer-list.component';
import { UploadAnswerComponent } from './question-list/answer-list/upload-answer/upload-answer.component';
import { UpdateAnswerComponent } from './question-list/answer-list/update-answer/update-answer.component';

@NgModule({
  imports: [
    CommonModule,
    TestListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxHtmlEditorModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [
    TestListComponent,
    QuestionListComponent,
    AnswerListComponent,
    UploadTestComponent,
    UpdateTestComponent,
    UploadAnswerComponent,
    UploadQuestionComponent,
    UpdateQuestionComponent,
    UpdateAnswerComponent,
    TestDetailComponent,
  ],
})
export class TestListModule {}
