import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorClassroomRoutingModule } from './instructor-classroom-routing.module';
import { InstructorClassroomComponent } from './instructor-classroom.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';

@NgModule({
  imports: [
    CommonModule,
    InstructorClassroomRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxSelectBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [InstructorClassroomComponent],
})
export class InstructorClassroomModule {}
