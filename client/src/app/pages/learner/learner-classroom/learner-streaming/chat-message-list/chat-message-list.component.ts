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

  @Input() sendPrivateMessage: (
    message: string,
    receiveUserEntry: UserEntry
  ) => void;
  @Input() closePopupChat: () => void;
  currentChatInput: string = '';

  receiveUserEntry: UserEntry = {
    id: '-1',
    displayName: '',
  };

  chatUserList: Array<any> = [];

  receiverFilterList: Array<any> = [];

  constructor(private store: StoreService) {}

  onEnterKey() {
    this.sendChatMessage();
  }
  onChatInputChanged(e: any) {
    this.currentChatInput = e.value;
  }

  onReceiverChanged(e: any) {
    this.receiveUserEntry.id = e.value;
    const targetEntry = this.chatUserList.find(
      (e: any) => e.id == this.receiveUserEntry.id
    );
    this.receiveUserEntry.displayName = targetEntry?.displayName;
    console.log(this.receiveUserEntry);
  }

  chatUserListenerListener() {
    return this.store.$chatUserList.subscribe((data: any) => {
      if (data) {
        this.chatUserList = data;
        this.receiverFilterList = data;
        if (!this.receiverFilterList.find((e: any) => e.id == '-1')) {
          this.receiverFilterList.unshift({ id: '-1', displayName: 'ALL' });
        }
      }
    });
  }

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.userEntry.id = data;
      }
    });
  }

  sendChatMessage() {
    if (this.currentChatInput.trim() !== '') {
      if (this.receiveUserEntry.id == '-1') {
        this.sendMessage(this.currentChatInput);
      } else {
        this.sendPrivateMessage(this.currentChatInput, this.receiveUserEntry);
      }
      this.dxTextBox.instance.reset();
      this.dxScrollView.instance.scrollBy(
        this.dxScrollView.instance.scrollHeight() + 100
      );
    }
  }

  ngOnInit() {
    this.chatUserListenerListener();
    this.getUserID();
  }

  ngOnChanges() {
    console.log(this.chatMessageList);
  }

  ngOnDestroy() {
    this.getUserID().unsubscribe();
    this.chatUserListenerListener().unsubscribe();
  }
}

export class ChatMessageListModule {}
