import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectListRoutingModule } from './subject-list-routing.module';
import { SubjectListComponent } from './subject-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
} from 'devextreme-angular';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';

@NgModule({
  imports: [
    CommonModule,
    SubjectListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    FormatCurrencyModule,
  ],
  declarations: [SubjectListComponent, SubjectDetailComponent],
})
export class SubjectListModule {}
