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
  DxDateBoxModule,
} from 'devextreme-angular';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { UploadSessionComponent } from './upload-session/upload-session.component';

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
    DxDateBoxModule,
    DxSelectBoxModule,
    FormatCurrencyModule,
  ],
  declarations: [
    SessionListComponent,
    EditSessionComponent,
    UploadSessionComponent,
  ],
})
export class SessionListModule {}
