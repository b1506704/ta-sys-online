import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMessageListRoutingModule } from './edit-message-list-routing.module';
import { EditMessageListComponent } from './edit-message-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditMessageListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditMessageListComponent],
})
export class EditMessageListModule {}
