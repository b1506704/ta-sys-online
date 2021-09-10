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
} from 'devextreme-angular';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';

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
    DxSelectBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [CourseListComponent, CourseDetailComponent],
})
export class CourseListModule {}
