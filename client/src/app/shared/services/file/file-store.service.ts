import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import saveAs from 'file-saver';
import { File } from '../../models/file';
import { Container } from '../../models/container';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { FileHttpService } from './file-http.service';
import { confirm } from 'devextreme/ui/dialog';

interface FileState {
  fileList: Array<File>;
  containerList: Array<Container>;
  isUploading: boolean;
  isUploadingFiles: boolean;
  isUpdatingFile: boolean;
  isRenamingFile: boolean;
  isUploadingFolder: boolean;
  isUpdatingFolder: boolean;
  exportData: Array<File>;
  selectedFile: Object;
  fileInstance: File;
  downloadedFile: any;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: String;
}
const initialState: FileState = {
  fileList: [],
  containerList: [],
  isUploading: false,
  isUpdatingFile: false,
  isRenamingFile: false,
  isUploadingFiles: false,
  isUploadingFolder: false,
  isUpdatingFolder: false,
  selectedFile: {},
  fileInstance: undefined,
  downloadedFile: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class FileStore extends StateService<FileState> {
  constructor(
    private fileService: FileHttpService,
    private store: StoreService
  ) {
    super(initialState);
  }

  initInfiniteDataByContainer(container: string) {
    this.setIsLoading(true);
    return this.fileService
      .fetchFilesByContainer(container)
      .toPromise()
      .then((data: any) => {
        this.setState({ fileList: [] });
        this.setState({
          fileList: data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.fileList);
        this.setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.responseMessage);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    return this.fileService
      .filterFileByProperty(property, value, page, size)
      .toPromise();
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $fileList: Observable<Array<File>> = this.select((state) => state.fileList);

  $fileInstance: Observable<File> = this.select((state) => state.fileInstance);

  $containerList: Observable<Array<Container>> = this.select(
    (state) => state.containerList
  );

  $isUploading: Observable<boolean> = this.select((state) => state.isUploading);

  $isUploadingFiles: Observable<boolean> = this.select(
    (state) => state.isUploadingFiles
  );

  $isUpdatingFile: Observable<boolean> = this.select(
    (state) => state.isUpdatingFile
  );

  $isRenamingFile: Observable<boolean> = this.select(
    (state) => state.isRenamingFile
  );

  $isUploadingFolder: Observable<boolean> = this.select(
    (state) => state.isUploadingFolder
  );

  $isUpdatingFolder: Observable<boolean> = this.select(
    (state) => state.isUpdatingFolder
  );

  downloadFile(id: string) {
    this.setIsLoading(true);
    this.fileService.downloadFile(id).subscribe({
      next: (data: any) => {
        console.log(data);
        saveAs(data.url, data.fileName, { type: data.fileType });
        this.setIsLoading(false);
        this.store.showNotif(data.responseMessage, 'custom');
      },
      error: (data: any) => {
        this.store.showNotif(data.error.responseMessage, 'custom');
        this.setIsLoading(false);
        console.log(data);
      },
    });
  }

  getFile(id: string) {
    this.setIsLoading(true);
    return this.fileService
      .filterFileByProperty('sourceID', id, 1, 1)
      .toPromise();
  }

  getFiles(sourceIDs: Array<string>) {
    // this.setState({ fileList: [] });
    this.setIsLoading(true);
    for (let i = 0; i < sourceIDs.length; i++) {
      this.getFile(sourceIDs[i]).then((data: any) => {
        if (data?.data) {
          this.setState({ fileList: this.state.fileList.concat(data.data[0]) });
        }
      });
      if (i === sourceIDs.length - 1) {
        this.setIsLoading(false);
      }
    }
  }

  downloadFiles(selectedItems: Array<string>) {
    this.setIsLoading(true);
    const currentDate = new Date();
    this.fileService.downloadFiles(selectedItems).subscribe({
      next: (data: any) => {
        if (data !== null) {
          console.log(data);
          let blob: any = new Blob([data], { type: 'application/zip' });
          saveAs(blob, `${currentDate.toLocaleDateString()}.zip`);
          this.store.showNotif('1 zip downloaded', 'custom');
          this.setIsLoading(false);
        }
      },
      error: (data: any) => {
        this.store.showNotif(data.error.responseMessage, 'error');
        this.setIsLoading(false);
        console.log(data);
      },
    });
  }

  changeFileName(id: string, fileName: string) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.setIsRenamingFile(true);
        this.fileService.changeFileName(id, fileName).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.setIsLoading(false);
            this.setIsRenamingFile(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.setIsRenamingFile(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  updateFile(id: string, sourceID: string, title: string) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.setIsUpdatingFile(true);
        this.fileService.updateFile(id, sourceID, title).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.setIsUpdatingFile(false);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.setIsUpdatingFile(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  uploadFiles(selectedFiles: Array<File>) {
    this.setIsLoading(true);
    this.setIsUploadingFiles(true);
    this.fileService.uploadFiles(selectedFiles).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        console.log(data);
        this.setIsLoading(false);
        this.setIsUploadingFiles(false);
        this.store.showNotif(data.responseMessage, 'custom');
      },
      error: (data: any) => {
        this.store.showNotif(data.error.responseMessage, 'error');
        this.setIsLoading(false);
        this.setIsUploadingFiles(false);
        console.log(data);
      },
    });
  }

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  copySelectedFiles(selectedFiles: Array<File>, targetContainer: string) {
    this.setIsLoading(true);
    return this.fileService
      .copyFiles(selectedFiles, targetContainer)
      .toPromise();
  }

  moveSelectedFiles(selectedFiles: Array<File>, targetContainer: string) {
    this.setIsLoading(true);
    return this.fileService
      .moveFiles(selectedFiles, targetContainer)
      .toPromise();
  }

  deleteSelectedFiles(selectedFiles: Array<string>) {
    this.setIsLoading(true);
    return this.fileService.deleteSelectedFiles(selectedFiles).toPromise();
  }

  selectFile(_file: File) {
    this.setState({ selectedFile: _file });
  }

  setTotalPages(_totalPages: number) {
    this.setState({ totalPages: _totalPages });
  }

  setTotalItems(_totalItems: number) {
    this.setState({ totalItems: _totalItems });
  }

  setCurrentPage(_currentPage: number) {
    this.setState({ currentPage: _currentPage });
  }

  // container functions

  initInfiniteContainer() {
    this.setIsLoading(true);
    return this.fileService
      .fetchContainer()
      .toPromise()
      .then((data: any) => {
        this.setState({
          containerList: data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.containerList);
        this.setIsLoading(false);
      });
  }

  uploadContainer(container: Container) {
    this.setIsLoading(true);
    this.setIsUploadingFolder(true);
    this.fileService.uploadContainer(container).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        console.log(data);
        this.setIsLoading(false);
        this.setIsUploadingFolder(false);
        this.store.showNotif(data.responseMessage, 'custom');
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.setIsUploadingFolder(false);
        this.store.showNotif(data.error.responseMessage, 'custom');
        console.log(data);
      },
    });
  }

  updateContainer(oldContainerName: string, newContainerName: string) {
    this.setIsLoading(true);
    this.setIsUpdatingFolder(true);
    this.fileService
      .updateContainer(oldContainerName, newContainerName)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          console.log(data);
          this.setIsLoading(false);
          this.setIsUpdatingFolder(false);
          this.store.showNotif(data.responseMessage, 'custom');
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.setIsUpdatingFolder(false);
          this.store.showNotif(data.errorMessage.message, 'custom');
          console.log(data);
        },
      });
  }

  deleteContainer(container: Array<string>) {
    this.setIsLoading(true);
    return this.fileService.deleteContainer(container).toPromise();
  }

  setIsUploading(isFetching: boolean) {
    this.setState({ isUploading: isFetching });
  }

  setIsUploadingFiles(isFetching: boolean) {
    this.setState({ isUploadingFiles: isFetching });
  }

  setIsUpdatingFile(isFetching: boolean) {
    this.setState({ isUpdatingFile: isFetching });
  }

  setIsRenamingFile(isFetching: boolean) {
    this.setState({ isRenamingFile: isFetching });
  }

  setIsUploadingFolder(isFetching: boolean) {
    this.setState({ isUploadingFolder: isFetching });
  }

  setIsUpdatingFolder(isFetching: boolean) {
    this.setState({ isUpdatingFolder: isFetching });
  }
}
