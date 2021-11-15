import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerClassroomRoutingModule } from './Learner-classroom-routing.module';
import { LearnerClassroomComponent } from './Learner-classroom.component';
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
import { ChatUserListModule } from 'src/app/shared/components/chat-user-list/chat-user-list.component';
import { DxiToolbarItemModule } from 'devextreme-angular/ui/nested';

@NgModule({
  imports: [
    CommonModule,
    LearnerClassroomRoutingModule,
    DxButtonModule,
    ChatUserListModule,
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
  declarations: [
    LearnerClassroomComponent,
  ],
})
export class LearnerClassroomModule {}
