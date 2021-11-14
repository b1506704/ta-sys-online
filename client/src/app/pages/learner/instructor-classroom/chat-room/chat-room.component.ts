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
  @Input() userEntry: UserEntry = {
    id: '',
    displayName: '',
  };
  messageList: Array<Message> = [];

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

  constructor(
    private messageStore: MessageStore,
    private messageHTTP: MessageHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentUserId = data;
      }
    });
  }

  getUserDisplayName() {
    return this.store.$currentUser.subscribe((data: string) => {
      if (data) {
        this.currentUserDisplayname = data;
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
    this.message.content = e.value;
  }

  sendChatMessage() {
    if (this.message.content.trim() !== '') {
      this.messageStore.uploadMessage(this.message, 1, 1);
      this.scrollView.instance.scrollBy(
        this.scrollView.instance.scrollHeight() + 100
      );
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
      this.messageList = data;
      console.log('LESSON VALUE');
      console.log(data);
    });
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
        console.log('IMAGE LIST OF DOCTOR');
        console.log(this.fileList);
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

        this.messageDataListener();
        this.fileDataListener();
      }
    });
  }

  ngOnInit(): void {
    this.getUserID();
    this.getUserDisplayName();
    this.initData();
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.initData().unsubscribe();
    this.messageDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.fileDataListener().unsubscribe();
  }
}
