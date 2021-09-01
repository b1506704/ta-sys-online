import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCourseListRoutingModule } from './edit-course-list-routing.module';
import { EditCourseListComponent } from './edit-course-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditCourseListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditCourseListComponent],
})
export class EditCourseListModule {}
