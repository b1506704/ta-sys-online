import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionListRoutingModule } from './session-list-routing.module';
import { SessionListComponent } from './session-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
  DxSelectBoxModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    SessionListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule,
    DxSelectBoxModule,
  ],
  declarations: [SessionListComponent],
})
export class SessionListModule {}
