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
import { StoreService } from 'src/app/shared/services/store.service';

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

  @Input() sendPrivateMessage: (message: string, receiveUserEntry: UserEntry) => void;
  @Input() closePopupChat: () => void;
  currentChatInput: string = '';

  receiveUserEntry: UserEntry = {
    id: '',
    displayName: '',
  };

  chatUserList: Array<any> = [];

  constructor(private store: StoreService) {}

  onEnterKey() {
    this.sendChatMessage();
  }
  onChatInputChanged(e: any) {
    this.currentChatInput = e.value;
  }

  onReceiverChanged(e: any) {
    this.receiveUserEntry.id = e.value;
    console.log(this.receiveUserEntry);
  }

  chatUserListenerListener() {
    return this.store.$chatUserList.subscribe((data: any) => {
      if (data) {
        this.chatUserList = data;
      }
    });
  }

  sendChatMessage() {
    if (this.currentChatInput.trim() !== '') {
      if (this.sendPrivateMessage)
      this.sendMessage(this.currentChatInput);
      this.dxTextBox.instance.reset();
      this.dxScrollView.instance.scrollBy(
        this.dxScrollView.instance.scrollHeight() + 100
      );
    }
  }

  ngOnInit() {
    this.chatUserListenerListener();
  }

  ngOnChanges() {
    console.log(this.chatMessageList);
  }

  ngOnDestroy() {
    this.chatUserListenerListener().unsubscribe();
  }
}

export class ChatMessageListModule {}
