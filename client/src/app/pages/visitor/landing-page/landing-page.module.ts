import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {
  DxButtonModule,
  DxFormModule,
  DxGalleryModule,
  DxHtmlEditorModule,
  DxPopupModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { GetDayOfWeekModule } from 'src/app/shared/pipes/getDayOfWeek.module';
@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    DxGalleryModule,
    DxButtonModule,
    DxPopupModule,
    DxHtmlEditorModule,
    FormatCurrencyModule,
    GetDayOfWeekModule,
    DxScrollViewModule,
    DxFormModule,
    DxButtonModule,
  ],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
