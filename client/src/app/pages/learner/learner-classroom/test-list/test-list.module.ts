import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListRoutingModule } from './test-list-routing.module';
import { TestListComponent } from './test-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxHtmlEditorModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { TestDetailComponent } from './test-detail/test-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TestListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxHtmlEditorModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [TestListComponent, TestDetailComponent],
})
export class TestListModule {}
