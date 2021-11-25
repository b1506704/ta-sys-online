import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TestResultComponent } from './test-result.component';
import { TestResultRoutingModule } from './test-result-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TestResultRoutingModule,
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
  declarations: [TestResultComponent],
})
export class TestResultModule {}
