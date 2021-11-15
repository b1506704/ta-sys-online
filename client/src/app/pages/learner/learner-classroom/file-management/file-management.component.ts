import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DxFileManagerComponent } from 'devextreme-angular';
import { StoreService } from 'src/app/shared/services/store.service';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { Container } from 'src/app/shared/models/container';
import { Course } from 'src/app/shared/models/course';
@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss'],
})
export class FileManagementComponent implements OnInit {
  @ViewChild(DxFileManagerComponent, { static: false })
  dxFileManager: DxFileManagerComponent;
  isItemMode = false;
  isDirectorySelected: boolean = true;
  currentDirectory: string = '';
  fileItems: Array<any> = [];
  isPopupVisible!: boolean;

  sourceDirectory!: string;
  currentFile!: any;
  fileList: Array<any> = [];
  selectedKeys: Array<string> = [];
  selectedItemKey: string;
  selectedItem: any;
  currentIndexFromServer!: number;
  pageSize: number = 5;
  refreshMenuOptions = {
    items: [
      {
        text: 'Refresh',
        icon: 'refresh',
        hint: 'Refresh folder directory',
      },
    ],
    onItemClick: this.refresh.bind(this),
  };
  downloadZipMenuOptions = {
    items: [
      {
        text: 'Download Zip',
        icon: 'download',
        hint: 'Download as zip',
      },
    ],
    onItemClick: this.downloadZip.bind(this),
  };

  containerList: Array<Container> = [];

  courseData: Course;

  constructor(
    private router: Router,
    private store: StoreService,
    private fileStore: FileStore
  ) {}

  getMetaData() {
    return this.store.$currentCourse.subscribe((data: Course) => {
      if (data) {
        this.courseData = data;
        console.log(this.courseData);
        this.refreshFolder();
        this.fileDataListener();
      }
    });
  }
  downloadImage() {
    if (this.selectedItemKey.length !== 0) {
      this.fileStore
        .confirmDialog('Download this item?')
        .then((confirm: boolean) => {
          if (confirm) {
            this.fileStore.downloadFile(this.selectedItemKey);
          }
        });
    }
  }

  downloadZip() {
    if (this.selectedKeys.length !== 0) {
      this.fileStore
        .confirmDialog('Download selected items as zip?')
        .then((confirm: boolean) => {
          if (confirm) {
            this.fileStore.downloadFiles(this.selectedKeys);
          }
        });
    }
  }

  refreshFolder() {
    this.fileStore.initInfiniteContainer().then(() => {
      this.containerDataListener();
    });
  }

  refresh() {
    this.mapContainerToFolder();
    setTimeout(() => {
      this.loadFileByFolder();
    }, 500);
  }

  loadFileByFolder() {
    console.log(this.fileItems);
    this.fileList = [];
    if (this.currentDirectory !== '') {
      this.fileStore
        .initInfiniteDataByContainer(this.currentDirectory)
        .then(() => {
          this.mapFileToImage();
        });
    }
  }

  onSelectionChanged(e: any) {
    console.log('SELECTION CHANGED');
    console.log(e);
    this.selectedKeys = e.selectedItemKeys;
    this.selectedItemKey = e.currentSelectedItemKeys[0];
    if (e.selectedItems) {
      e.selectedItems.forEach((item: any) => {
        this.isDirectorySelected = item.isDirectory;
      });
    }
    this.selectedItem = e.selectedItems[0]?.dataItem;
    if (e.selectedItems[0]?.isDirectory === true) {
      this.currentDirectory = e.selectedItems[0]?.dataItem.name;
    }
    console.log('IS DIRECTORY SELECTED: ', this.isDirectorySelected);
  }

  onToolbarItemClick(e: any) {
    console.log('TOOLBAR ITEM');
    console.log(e);
  }

  onContextItemClick(e: any) {
    console.log('CONTEXT MENU ITEM');
    console.log(e);
    switch (e.itemData.name) {
      case 'downloadImage':
        this.downloadImage();
        break;
      default:
        break;
    }
  }

  onOptionChanged(e: any) {
    console.log('OPTION CHANGED');
    console.log(e);
    if (e.fullName === 'currentPath') {
      if (e.value !== '') {
        this.isItemMode = true;
      } else {
        this.isItemMode = false;
      }
      console.log('IS ITEM MODE: ', this.isItemMode);
      this.currentDirectory = e.value;
      this.loadFileByFolder();
    }
  }

  displayImagePopup(e: any) {
    this.currentFile = e.file;
    this.isPopupVisible = true;
    console.log('OPENED FILE: ');
    console.log(e.file);
  }

  fileDataListener() {
    return this.fileStore.$fileList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.fileList = data;
        console.log('FILE LIST OF FILE MANAGEMENT');
        //
      }
    });
  }

  mapContainerToFolder() {
    this.fileItems = [];
    if (this.containerList?.length !== 0) {
      for (let i = 0; i < this.containerList?.length; i++) {
        const container = this.containerList[i];
        console.log(container);
        if (container.name) {
          this.fileItems.push({
            name: container.name,
            isDirectory: true,
            items: [],
          });
        }
      }
      setTimeout(() => {
        this.dxFileManager.instance.refresh();
      }, 100);
    }
  }

  mapFileToImage() {
    const folderIndex = this.fileItems.findIndex(
      (e: any) => e.name === this.currentDirectory
    );
    this.fileItems[folderIndex].items = [];
    console.log(`Folder for inserting item index: ${folderIndex}`);
    if (this.fileList.length !== 0) {
      for (let i = 0; i < this.fileList.length; i++) {
        const file = this.fileList[i];
        this.fileItems[folderIndex].items.push({
          type: file.fileType,
          __KEY__: file.id,
          name: file.fileName,
          title: file.title,
          isDirectory: false,
          size: file.fileSize,
          thumbnail: file.url,
          id: file.id,
          sourceID: file.sourceID,
        });
      }
    }
    console.log(this.fileItems[folderIndex].items);
    console.log('CURRENT DX FILES');
    console.log(this.fileItems);
    setTimeout(() => {
      this.dxFileManager.instance.refresh();
    }, 500);
  }

  containerDataListener() {
    return this.fileStore.$containerList.subscribe((data: Array<any>) => {
      if (data?.length !== 0) {
        const courseFolder = data.find(
          (c: any) => c?.name === this.courseData?.name.toLocaleLowerCase()
        );
        this.containerList = [courseFolder];
        // setTimeout(() => {
        this.mapContainerToFolder();
        // }, 100);
      }
    });
  }

  ngOnInit(): void {
    this.getMetaData();
  }

  ngOnDestroy(): void {
    this.getMetaData().unsubscribe();
    this.containerDataListener().unsubscribe();
    this.fileDataListener().unsubscribe();
  }
}
