import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { StoreService } from 'src/app/shared/services/store.service';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
@Component({
  selector: 'app-upload-batch',
  templateUrl: './upload-batch.component.html',
  styleUrls: ['./upload-batch.component.scss'],
})
export class UploadBatchComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxFormComponent, { static: false }) dxForm: DxFormComponent;
  @Input() directory!: string;
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
  fileList: Array<any> = [];
  imageList: Array<any> = [];
  isUploading!: boolean;
  pageSize: number = 100;
  tempUrl: Array<string> = [];
  constructor(private fileStore: FileStore, private store: StoreService) {}

  handleInputChange(e: any) {
    var files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    console.log(files);
    if (files.length !== 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        if (file.size <= 20000000) {
          var reader = new FileReader();
          reader.onload = this.handleReaderLoaded.bind(this);
          reader.readAsDataURL(file);
          const imageData = {
            sourceID: '',
            category: this.directory,
            container: this.directory,
            title: file.name,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            url: '',
          };
          const fileData = {
            sourceID: '7d87bb3b-6eec-649e-42c2-eb6dabb6355a',
            category: this.directory,
            container: this.directory,
            fileName: file.name,
            title: file.name,
            fileType: file.type,
            fileSize: file.size,
          };
          this.imageList = this.imageList.concat(imageData);
          this.fileList = this.fileList.concat(fileData);
        } else {
          this.store.showNotif('Image cannot exceed 2MB', 'custom');
        }
      }
    }
  }

  lazyInsertImage() {
    for (let i = 0; i < this.tempUrl.length; i++) {
      const base64Url = this.tempUrl[i];
      this.imageList[i].url = base64Url;
      this.fileList[i].data = base64Url.split(',')[1];
    }
    console.log(this.imageList);
    console.log(this.fileList);
  }

  handleReaderLoaded(e: any) {
    var reader = e.target;
    this.tempUrl.push(reader.result);
    this.lazyInsertImage();
  }

  resetValues() {
    this.fileList = [];
    this.imageList = [];
    this.tempUrl = [];
  }

  isUploadingFilesListener() {
    return this.fileStore.$isUploadingFiles.subscribe((data: boolean) => {
      this.isUploading = data;
    });
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    if (this.fileList.length) {
      this.fileStore.uploadFiles(this.fileList);
      this.resetValues();
    } else {
      this.store.showNotif('Please select a file', 'custom');
    }
  };

  ngOnInit(): void {
    this.isUploadingFilesListener();
    this.resetValues();
  }

  ngOnChanges(): void {
    this.resetValues();
  }

  ngOnDestroy(): void {
    this.isUploadingFilesListener().unsubscribe();
  }
}
