import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDiscountListRoutingModule } from './edit-discount-list-routing.module';
import { EditDiscountListComponent } from './edit-discount-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditDiscountListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditDiscountListComponent],
})
export class EditDiscountListModule {}
