import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListRoutingModule } from './post-list-routing.module';
import { PostListComponent } from './post-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxHtmlEditorModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { UploadPostComponent } from './upload-post/upload-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UpdatePostComponent } from './update-post/update-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxHtmlEditorModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [
    PostListComponent,
    CommentListComponent,
    UploadPostComponent,
    UpdatePostComponent,
    PostDetailComponent,
  ],
})
export class PostListModule {}
