import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonListRoutingModule } from './lesson-list-routing.module';
import { LessonListComponent } from './lesson-list.component';
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
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@NgModule({
  imports: [
    CommonModule,
    LessonListRoutingModule,
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
  declarations: [LessonListComponent, LessonDetailComponent],
})
export class LessonListModule {}
