import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentTestRoutingModule } from './current-test-routing.module';
import { CurrentTestComponent } from './current-test.component';
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
  DxCheckBoxModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { AnswerListComponent } from './question-list/answer-list/answer-list.component';
import { TestResultDetailComponent } from './test-result/test-result.component';

@NgModule({
  imports: [
    CommonModule,
    CurrentTestRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxHtmlEditorModule,
    DxCheckBoxModule,
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
    CurrentTestComponent,
    QuestionListComponent,
    TestResultDetailComponent,
    AnswerListComponent,
  ],
})
export class CurrentTestModule {}
