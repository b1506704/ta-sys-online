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
  ],
  declarations: [SubjectListComponent],
})
export class SubjectListModule {}
