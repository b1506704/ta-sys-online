import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
@Component({
  selector: 'app-rename-file',
  templateUrl: './rename-file.component.html',
  styleUrls: ['./rename-file.component.scss'],
})
export class RenameFileComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxFormComponent, { static: false }) dxForm: DxFormComponent;
  @Input() selectedItem: any;
  submitButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: this.resetValues.bind(this),
  };
  fileData: any;
  isUploading!: boolean;
  constructor(private fileStore: FileStore) {}

  isUploadingListener() {
    return this.fileStore.$isRenamingFile.subscribe((data: boolean) => {
      this.isUploading = data;
    });
  }

  resetValues() {
    this.fileData = {
      id: '',
      fileName: '',
    };
  }

  renderSelectedFile() {
    if (this.selectedItem) {
      console.log('SELECTED IMAGE');
      console.log(this.selectedItem);
      this.fileData.id = this.selectedItem.__KEY__;
      this.fileData.fileName = this.selectedItem.name;
    }
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.fileStore.changeFileName(this.fileData.id, this.fileData.fileName);
    this.resetValues();
  };

  ngOnInit(): void {
    this.isUploadingListener();
  }

  ngOnChanges(): void {
    this.resetValues();
    this.renderSelectedFile();
  }

  ngOnDestroy(): void {
    this.isUploadingListener().unsubscribe();
  }
}
