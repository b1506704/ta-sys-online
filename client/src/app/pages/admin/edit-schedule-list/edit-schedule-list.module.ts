import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditScheduleListRoutingModule } from './edit-schedule-list-routing.module';
import { EditScheduleListComponent } from './edit-schedule-list.component';
import {
  DxDataGridModule,
  DxToolbarModule,
  DxButtonModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditScheduleListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditScheduleListComponent],
})
export class EditScheduleListModule {}
