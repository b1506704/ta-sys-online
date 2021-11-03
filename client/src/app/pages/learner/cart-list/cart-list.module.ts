import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListRoutingModule } from './cart-list-routing.module';
import { CartListComponent } from './cart-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CartListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    NgxPayPalModule,
    FormatCurrencyModule,
    DxFormModule,
    DxSelectBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [CartListComponent, CourseDetailComponent],
})
export class CartListModule {}
