import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorClassroomRoutingModule } from './instructor-classroom-routing.module';
import { InstructorClassroomComponent } from './instructor-classroom.component';
import {
  DxButtonModule,
  DxFormModule,
  DxGalleryModule,
  DxListModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSpeedDialActionModule,
  DxTextBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DxiToolbarItemModule } from 'devextreme-angular/ui/nested';

@NgModule({
  imports: [
    CommonModule,
    InstructorClassroomRoutingModule,
    DxButtonModule,
    DxScrollViewModule,
    DxListModule,
    DxFormModule,
    DxPopupModule,
    DxGalleryModule,
    DxToolbarModule,
    DxiToolbarItemModule,
    DxSpeedDialActionModule,
    DxTextBoxModule,
    DxButtonModule,
  ],
  declarations: [InstructorClassroomComponent],
})
export class InstructorClassroomModule {}
