import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorStreamingRoutingModule } from './instructor-streaming-routing.module';
import { InstructorStreamingComponent } from './instructor-streaming.component';
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
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { DxiToolbarItemModule } from 'devextreme-angular/ui/nested';
import { LessonListComponent } from './lesson-list/lesson-list.component';

@NgModule({
  imports: [
    CommonModule,
    InstructorStreamingRoutingModule,
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
  ],
  declarations: [
    InstructorStreamingComponent,
    ChatMessageListComponent,
    LessonListComponent,
  ],
})
export class InstructorStreamingModule {}
