import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from 'src/app/shared/models/message';
import { MessageStore } from 'src/app/shared/services/message/message-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent, DxTextBoxComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { MessageHttpService } from 'src/app/shared/services/message/message-http.service';
import { UserEntry } from 'src/app/shared/models/user-entry';
import { Course } from 'src/app/shared/models/course';
import { SignalrService } from 'src/app/shared/services/streaming/signalr.service';
import { ChatMessage } from 'src/app/shared/models/chat-message';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  @ViewChild(DxTextBoxComponent, { static: false })
  dxTextBox: DxTextBoxComponent;
  userEntry: UserEntry = {
    id: '',
    displayName: '',
  };
  messageList: Array<any> = [];
  chatUserList: Array<UserEntry> = [];

  message: Message;
  currentChatInput: string = '';
  pageSize: number = 100;
  pullDown = false;
  updateContentTimer: any;
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;
  isSortingByPrice: boolean;
  isUploadPopupVisible: boolean = false;
  isUpdatePopupVisible: boolean = false;
  isDetailPopupVisible: boolean = false;

  currentCategoryFilterValue: string;
  timeout: any;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'courseId';

  currentUserId: string;
  currentUserDisplayname: string;

  room: any = {
    name: '',
  };

  fileData: File = {
    sourceID: '',
    container: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  fileList: Array<File> = [];

  courseData!: Course;
  creatorData!: any;
  streamSessionData!: any;
  currentCourseId: string;

  constructor(
    private messageStore: MessageStore,
    private messageHTTP: MessageHttpService,
    private store: StoreService,
    private fileStore: FileStore,
    private signaling: SignalrService
  ) {}

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentUserId = data;
        this.userEntry.id = data;
      }
    });
  }

  getDisplayName() {
    return this.store.$currentUser.subscribe((data: string) => {
      if (data) {
        this.userEntry.displayName = data;
        console.log(this.userEntry.displayName);
        this.initData();
      }
    });
  }
  deleteMessage(message: Message) {
    this.messageStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.messageHTTP.deleteMessage([message.id]).subscribe((data: any) => {
          this.initData();
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
        });
      }
    });
  }
  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.messageList.length) {
        switch (editorMode) {
          case 'NORMAL':
            this.paginatePureData(currentIndex + 1);
            break;
          case 'FILTER':
            // this.paginateFilterData(currentIndex + 1);
            break;
          case 'SEARCH':
            // this.paginateSearchData(currentIndex + 1);
            break;
          case 'SORT':
            // this.paginateSortData(currentIndex + 1);
            break;
          default:
            break;
        }
      }
      args.component.release();
    }, 500);
  };

  updateTopContent = (e: any) => {
    this.updateContent(e, 'PullDown');
  };
  updateBottomContent = (e: any) => {
    this.updateContent(e, 'ReachBottom');
  };
  checkEditorMode() {
    if (this.isFilteringByCategory === true) {
      return 'FILTER';
    } else if (this.isSearchingByName === true) {
      return 'SEARCH';
    } else if (this.isSortingByPrice === true) {
      return 'SORT';
    } else {
      return 'NORMAL';
    }
  }

  paginatePureData(index: number) {
    this.messageStore.filterInfiniteMessageByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  onEnterKey() {
    this.sendChatMessage();
  }

  onChatInputChanged(e: any) {
    console.log(e.value);
    this.message.content = e.value;
  }

  sendChatMessage() {
    if (this.message.content.trim() !== '') {
      this.messageHTTP.uploadMessage(this.message).subscribe((data: any) => {
        console.log(data.responseMessage);
      });
      console.log(this.message.content);
      this.scrollView.instance.scrollBy(
        this.scrollView.instance.scrollHeight() + 100
      );
      this.signaling.invoke('SendMessage', this.room.name, this.message);
      this.dxTextBox.instance.reset();
    }
  }

  sendPrivateChatMessage() {
    if (this.message.content.trim() !== '') {
      this.messageStore.uploadMessage(this.message, 1, 1);
      this.scrollView.instance.scrollBy(
        this.scrollView.instance.scrollHeight() + 100
      );
    }
  }

  messageDataListener() {
    return this.messageStore.$messageList.subscribe((data: any) => {
      if (data) {
        this.messageList = data.reverse();
      }
      console.log('LESSON VALUE');
      console.log(data);
    });
  }

  fetchMediaBySourceID(sourceIDs: Array<any>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  mapFileListToUrl(_id: string) {
    if (this.fileList.length !== 0) {
      const fetchedFile = this.fileList.find(
        (e: any) => e.sourceID === _id
      )?.url;
      if (fetchedFile) {
        return fetchedFile;
      } else {
        return this.fileData.url;
      }
    }
    return this.fileData.url;
  }

  fileDataListener() {
    return this.fileStore.$fileList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.fileList = data;
        //
        //
      }
    });
  }

  currentPageListener() {
    return this.messageStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    return this.store.$currentCourse.subscribe((data: Course) => {
      if (data !== undefined) {
        this.currentCourseId = data.id;
        this.courseData = data;
        this.room.name = data.name;
        this.currentFilterByPropertyValue = data.id;
        this.message = {
          content: '',
          courseId: this.currentFilterByPropertyValue,
          recipientId: '',
          senderId: this.currentUserId,
        };
        this.messageStore.initInfiniteFilterByPropertyData(
          this.currentFilterProperty,
          this.currentFilterByPropertyValue,
          1,
          this.pageSize
        );

        if (this.currentFilterByPropertyValue) {
          this.signaling.connect('/auth', false).then(() => {
            if (this.signaling.isConnected()) {
              this.signaling.invoke('Authorize').then((token: string) => {
                if (token) {
                  sessionStorage.setItem('token', token);
                  this.start();
                }
              });
            }
          });
        }

        this.messageDataListener();
        this.fileDataListener();
      }
    });
  }

  start(): void {
    // #1 connect to signaling server
    this.signaling.connect('/classroom', true).then(() => {
      if (this.signaling.isConnected()) {
        this.signaling.invoke(
          'CreateOrJoinClass',
          this.room.name,
          this.userEntry
        );
      }
    });
    this.defineSignaling();
  }

  defineSignaling(): void {
    this.signaling.define('log', (message: any) => {
      console.log(message);
    });

    this.signaling.define('created', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('joined', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('left', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
      this.chatUserList = userEntryList;
      this.fetchMediaBySourceID(userEntryList.map((e: any) => e.id));
    });

    this.signaling.define('message', (userEntry: any, chatMessage: any) => {
      const date = new Date().toLocaleTimeString();
      console.log(chatMessage);
      console.log(userEntry);
      const message: any = {
        sender: {
          id: userEntry.id,
          displayName: userEntry.displayName,
        },
        courseId: this.currentFilterByPropertyValue,
        recipientId: chatMessage.recipientId,
        senderId: chatMessage.senderId,
        content: chatMessage.content,
        date: date,
      };
      this.messageList = this.messageList.concat(message);
      this.scrollView.instance.scrollBy(
        this.scrollView.instance.scrollHeight() + 100
      );
    });

    this.signaling.define(
      'privateMessage',
      (
        sendUserEntry: any,
        receiveUserEntry: any,
        chatMessage: any,
        date: any
      ) => {
        if (receiveUserEntry.id === this.userEntry.id) {
          const message: ChatMessage = {
            userEntry: sendUserEntry,
            message: chatMessage,
            date: date,
          };
          this.store.showNotif(chatMessage, 'custom');
        }
      }
    );
  }

  disconnect(): void {
    this.signaling
      .invoke('LeaveClass', this.room.name, this.userEntry)
      .then(() => {
        this.signaling.disconnect();
      });
  }

  ngOnInit(): void {
    this.currentPageListener();
    this.getUserID();
    this.getDisplayName();
    // this.initData();
  }

  ngOnDestroy(): void {
    this.initData().unsubscribe();
    this.getUserID().unsubscribe();
    this.getDisplayName().unsubscribe();
    this.messageDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.fileDataListener().unsubscribe();
    this.disconnect();
  }
}
