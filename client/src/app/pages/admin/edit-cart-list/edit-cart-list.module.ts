import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCartListRoutingModule } from './edit-cart-list-routing.module';
import { EditCartListComponent } from './edit-cart-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditCartListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditCartListComponent],
})
export class EditCartListModule {}
