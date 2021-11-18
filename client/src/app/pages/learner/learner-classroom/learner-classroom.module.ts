import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerClassroomRoutingModule } from './learner-classroom-routing.module';
import { LearnerClassroomComponent } from './learner-classroom.component';
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
    LearnerClassroomRoutingModule,
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
  declarations: [LearnerClassroomComponent],
})
export class LearnerClassroomModule {}
