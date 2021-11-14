import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';
import { CommentStore } from 'src/app/shared/services/comment/comment-store.service';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { DxTextBoxComponent } from 'devextreme-angular';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxTextBoxComponent, { static: false })
  dxTextBox: DxTextBoxComponent;
  @Input() postId!: string;
  @Input() currentUserId!: string;
  @Input() currentUserDisplayname!: string;
  commentList: Array<Comment> = [];
  pageSize: number = 100;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'postId';
  commentCount: number = 0;
  commentValue: string;

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
    private commentStore: CommentStore,
    private fileStore: FileStore,
    private store: StoreService
  ) {}

  commentInputChanged(e: any) {
    this.commentValue = e.value;
  }

  onEnterKey() {
    this.submitComment();
  }

  submitComment() {
    if (this.commentValue.trim() !== '') {
      const newComment: Comment = {
        postId: this.postId,
        content: this.commentValue,
        userAccountId: this.currentUserId,
      };
      this.commentStore.submitComment(newComment).then(() => {
        this.store.showNotif('New comment submitted', 'custom');
        this.dxTextBox.instance.reset();
        this.initData();
      });
    } else {
      this.store.showNotif('Please enter a value!', 'custom');
    }
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

  getCommentCount() {
    this.commentCount = this.commentList.length;
  }

  initData() {
    if (this.postId) {
      console.log('CURRENT POST ID');
      console.log(this.postId);
      this.commentStore
        .initInfiniteFilterByPropertyData(
          this.currentFilterProperty,
          this.postId,
          1,
          this.pageSize
        )
        .then((data: any) => {
          if (data.data) {
            this.commentList = data.data;
            this.commentStore.fetchMediaBySourceID(
              data.data.map((e: any) => e.userAccountResponse)
            );
            this.getCommentCount();
            this.fileDataListener();
          }
        });
    }
  }

  ngOnChanges(): void {
    this.initData();
  }

  ngOnInit(): void {
    this.fileDataListener();
  }

  ngOnDestroy(): void {
    this.fileDataListener().unsubscribe();
  }
}
