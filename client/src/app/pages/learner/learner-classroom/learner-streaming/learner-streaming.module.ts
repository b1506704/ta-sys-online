import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerStreamingRoutingModule } from './learner-streaming-routing.module';
import { LearnerStreamingComponent } from './learner-streaming.component';
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
import { ChatMessageListComponent } from './chat-message-list/chat-message-list.component';
import { DxiToolbarItemModule } from 'devextreme-angular/ui/nested';

@NgModule({
  imports: [
    CommonModule,
    LearnerStreamingRoutingModule,
    DxButtonModule,
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
    LearnerStreamingComponent,
    ChatMessageListComponent,
  ],
})
export class LearnerStreamingModule {}
