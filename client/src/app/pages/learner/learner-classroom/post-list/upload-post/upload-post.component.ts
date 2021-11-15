import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Post } from 'src/app/shared/models/post';
import { PostHttpService } from 'src/app/shared/services/post/post-http.service';
import { PostStore } from 'src/app/shared/services/post/post-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: 'upload-post.component.html',
  styleUrls: ['./upload-post.component.scss'],
})
export class UploadPostComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() userAccountId: string;
  @Input() courseId: string;
  @Input() post: Post;
  @Input() title: string;
  @Input() isVisible: boolean;
  @Input() closePopupUpload: () => void;
  valueType: string = 'string';
  currentTabList: any;
  selectedIndex: any;
  submitButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.dxForm.instance.resetValues();
      this.postData.content = '';
    },
  };

  postData: Post;

  constructor(
    private postHTTP: PostHttpService,
    private store: StoreService,
    private postStore: PostStore
  ) {}

  onSubmit = (e: any) => {
    e.preventDefault();
    this.postStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.postStore.setIsUploading(true);
        this.postHTTP.uploadPost(this.postData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.postStore.setIsUploading(false);
          this.closePopupUpload();
        });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.postData.content = e.value;
    console.log(e.value);
  }

  ngOnInit() {
    this.postData = {
      courseId: this.courseId,
      userAccountId: this.userAccountId,
      content: '',
      title: 'New blank post',
    };
  }

  ngOnDestroy() {}
}
