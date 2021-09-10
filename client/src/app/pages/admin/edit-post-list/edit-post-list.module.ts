import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPostListRoutingModule } from './edit-post-list-routing.module';
import { EditPostListComponent } from './edit-post-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditPostListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditPostListComponent],
})
export class EditPostListModule {}
