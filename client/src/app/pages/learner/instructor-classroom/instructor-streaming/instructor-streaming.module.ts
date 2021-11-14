import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorStreamingRoutingModule } from './instructor-streaming-routing.module';
import { InstructorStreamingComponent } from './instructor-streaming.component';
import {
  DxButtonModule,
  DxFormModule,
  DxGalleryModule,
  DxHtmlEditorModule,
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
import { QuestionListComponent } from './question-list/question-list.component';
import { TestListComponent } from './test-list/test-list.component';

@NgModule({
  imports: [
    CommonModule,
    InstructorStreamingRoutingModule,
    DxButtonModule,
    ChatUserListModule,
    DxScrollViewModule,
    DxListModule,
    DxFormModule,
    DxHtmlEditorModule,
    DxPopupModule,
    DxGalleryModule,
    DxToolbarModule,
    DxiToolbarItemModule,
    DxSpeedDialActionModule,
    DxTextBoxModule,
    DxButtonModule,
  ],
  declarations: [
    InstructorStreamingComponent,
    ChatMessageListComponent,
    LessonListComponent,
    QuestionListComponent,
    TestListComponent,
  ],
})
export class InstructorStreamingModule {}
