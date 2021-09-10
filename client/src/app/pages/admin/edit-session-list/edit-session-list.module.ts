import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSessionListRoutingModule } from './edit-session-list-routing.module';
import { EditSessionListComponent } from './edit-session-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [CommonModule, EditSessionListRoutingModule,DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,],
  declarations: [EditSessionListComponent],
})
export class EditSessionListModule {}
