import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileManagementRoutingModule } from './file-management-routing.module';
import { FileManagementComponent } from './file-management.component';
import {
  DxAutocompleteModule,
  DxFileManagerModule,
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSpeedDialActionModule,
  DxTileViewModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FileManagementRoutingModule,
    DxFileManagerModule,
    DxPopupModule,
    DxScrollViewModule,
    DxFormModule,
    DxTileViewModule,
    DxAutocompleteModule,
    DxSelectBoxModule,
    DxSpeedDialActionModule,
  ],
  declarations: [FileManagementComponent],
})
export class FileManagementModule {}
