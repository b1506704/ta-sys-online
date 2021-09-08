import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserInfoListRoutingModule } from './edit-user-info-list-routing.module';
import { EditUserInfoListComponent } from './edit-user-info-list.component';
import {
  DxDataGridModule,
  DxToolbarModule,
  DxButtonModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditUserInfoListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditUserInfoListComponent],
})
export class EditUserInfoModule {}
