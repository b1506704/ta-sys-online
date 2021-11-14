import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './chat-room.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxTextBoxModule,
  DxHtmlEditorModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    ChatRoomRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxHtmlEditorModule,
    DxTextBoxModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
  ],
  declarations: [ChatRoomComponent],
})
export class ChatRoomModule {}
