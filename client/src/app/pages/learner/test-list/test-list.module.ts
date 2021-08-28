import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListRoutingModule } from './test-list-routing.module';
import { TestListComponent } from './test-list.component';
import {
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSpeedDialActionModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { TestDetailComponent } from './test-detail/test-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TestListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    FormatCurrencyModule,
    DxPopupModule,
    DxFormModule
  ],
  declarations: [TestListComponent, TestDetailComponent],
})
export class TestListModule {}
