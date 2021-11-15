import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Post } from 'src/app/shared/models/post';
import { PostHttpService } from 'src/app/shared/services/post/post-http.service';
import { PostStore } from 'src/app/shared/services/post/post-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-update-post',
  templateUrl: 'update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() post: Post;
  @Input() title: string;
  @Input() isVisible: boolean;
  @Input() closePopupUpdate: () => void;
  valueType: string = 'string';

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
        this.postHTTP.updatePost(this.postData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.closePopupUpdate();
        });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.postData.content = e.value;
    console.log(e.value);
  }

  ngOnChanges(): void {
    this.postData = this.post;
    console.log(this.post);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
