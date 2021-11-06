import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment';
import { CommentStore } from 'src/app/shared/services/comment/comment-store.service';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() postId!: string;
  commentList: Array<Comment> = [];
  pageSize: number = 100;
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'postId';

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
    private fileStore: FileStore
  ) {}

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
          this.commentList = data.data;
          this.commentStore.fetchMediaBySourceID(data.data);
          setTimeout(() => {
            this.fileDataListener();
          }, 500);
        });
    }
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.fileDataListener().unsubscribe();
  }
}
