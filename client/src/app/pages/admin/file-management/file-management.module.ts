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
import { UpdateFileComponent } from './update-file/update-file.component';
import { UploadFolderComponent } from './upload-folder/upload-folder.component';
import { UploadBatchComponent } from './upload-batch/upload-batch.component';
import { UpdateFolderComponent } from './update-folder/update-folder.component';
import { RenameFileComponent } from './rename-file/rename-file.component';

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
    DxSpeedDialActionModule
  ],
  declarations: [
    FileManagementComponent,
    UpdateFileComponent,
    UploadFolderComponent,
    UploadBatchComponent,
    RenameFileComponent,
    UpdateFolderComponent,
  ],
})
export class FileManagementModule {}
