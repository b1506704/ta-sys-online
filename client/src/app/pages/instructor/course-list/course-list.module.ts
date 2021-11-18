import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListRoutingModule } from './course-list-routing.module';
import { CourseListComponent } from './course-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
  DxHtmlEditorModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { EditCourseComponent } from './edit-course/edit-course.component';

@NgModule({
  imports: [
    CommonModule,
    CourseListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxSelectBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [CourseListComponent, EditCourseComponent],
})
export class CourseListModule {}
