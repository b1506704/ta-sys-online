import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTestListRoutingModule } from './edit-test-list-routing.module';
import { EditTestListComponent } from './edit-test-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditTestListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditTestListComponent],
})
export class EditTestListModule {}
