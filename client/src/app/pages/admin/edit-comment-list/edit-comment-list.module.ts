import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCommentListRoutingModule } from './edit-comment-list-routing.module';
import { EditCommentListComponent } from './edit-comment-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditCommentListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditCommentListComponent],
})
export class EditCommentListModule {}
