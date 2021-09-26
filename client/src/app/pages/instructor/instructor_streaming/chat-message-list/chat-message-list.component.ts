import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { DxScrollViewComponent, DxTextBoxComponent } from 'devextreme-angular';
import { UserEntry } from 'src/app/shared/models/user-entry';

@Component({
  selector: 'app-chat-message-list',
  templateUrl: 'chat-message-list.component.html',
  styleUrls: ['./chat-message-list.component.scss'],
})
export class ChatMessageListComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxTextBoxComponent, { static: false })
  dxTextBox: DxTextBoxComponent;
  @Input() chatMessageList: Array<any> = [];
  @Input() isVisible: boolean;
  @Input() title: string;
  @Input() userEntry: UserEntry = {
    id: '',
    displayName: '',
  };
  @Input() sendMessage: (message: string) => void;
  @Input() closePopupChat: () => void;
  currentChatInput: string = '';
 
  constructor() {}

  onEnterKey() {
    this.sendChatMessage();
  }

  onChatInputChanged(e: any) {
    // console.log(e);
    this.currentChatInput = e.value;
  }

  sendChatMessage() {
    if (this.currentChatInput.trim() !== '') {
      // const message = {
      //   userEntry: this.userEntry,
      //   message: this.currentChatInput,
      //   date: new Date().toLocaleTimeString(),
      // };
      // this.chatMessageList = this.chatMessageList.concat(message);
      this.sendMessage(this.currentChatInput);
      this.dxTextBox.instance.reset();
      this.dxScrollView.instance.scrollBy(
        this.dxScrollView.instance.scrollHeight() + 100
      );
    }
  }

  ngOnInit() {
    // this.sen
  }

  ngOnChanges() {
    // this.sendMessage()
    console.log(this.chatMessageList);
  }

  ngOnDestroy() {}
}

export class ChatMessageListModule {}
