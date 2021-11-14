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
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    this.keyCombination.push(event.key);
    if (this.keyCombination.length > 2) {
      this.keyCombination = [];
    }
    this.handleOperation(this.keyCombination);
  }
  keyCombination: Array<string> = [];
  isItemMode = false;
  isDirectorySelected: boolean = true;
  currentDirectory: string = '';
  fileItems: Array<any> = [];
  isPopupVisible!: boolean;
  isUpdateFilePopupVisible!: boolean;
  isRenameFilePopupVisible!: boolean;
  isUploadBatchPopupVisible!: boolean;
  isKeyShortcutPopupVisible!: boolean;
  isUploading!: boolean;
  isLoading!: boolean;
  isCopying!: boolean;
  isMoving!: boolean;
  sourceDirectory!: string;
  tempCopyItems: Array<any> = [];
  currentFile!: any;
  uploadButtonOption: any = {};
  fileList: Array<any> = [];
  selectedKeys: Array<string> = [];
  selectedItemKey: string;
  selectedItem: any;
  currentIndexFromServer!: number;
  pageSize: number = 5;
  newFilesMenuOptions = {
    items: [
      {
        text: 'Upload Batch',
        icon: 'upload',
        hint: 'Upload multiple files',
      },
    ],
    onItemClick: this.uploadBatch.bind(this),
  };
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
  deleteMenuOptions = {
    items: [
      {
        text: 'Delete File',
        icon: 'trash',
        hint: 'Delete current file',
      },
    ],
    onItemClick: this.deleteFiles.bind(this),
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
  copyMenuOptions = {
    items: [
      {
        text: 'Copy',
        icon: 'copy',
        hint: 'Copy selected items',
      },
    ],
    onItemClick: this.copyFiles.bind(this),
  };
  pasteMenuOptions = {
    items: [
      {
        text: 'Paste',
        icon: 'paste',
        hint: 'Paste selected items',
      },
    ],
    onItemClick: this.pasteFiles.bind(this),
  };
  clearClipboardMenuOptions = {
    items: [
      {
        text: 'Clear Clipboard',
        icon: 'clear',
        hint: 'Clear memory of clipboard',
      },
    ],
    onItemClick: this.clearClipboard.bind(this),
  };
  moveMenuOptions = {
    items: [
      {
        text: 'Cut',
        icon: 'cut',
        hint: 'Cut selected items',
      },
    ],
    onItemClick: this.moveFiles.bind(this),
  };
  updateMenuOptions = {
    items: [
      {
        text: 'Link Source',
        icon: 'link',
        hint: 'Edit current file',
      },
    ],
    onItemClick: this.updateFile.bind(this),
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
  renameFile() {
    if (this.currentDirectory !== '') {
      this.isRenameFilePopupVisible = true;
    }
  }

  uploadBatch() {
    if (this.currentDirectory === '') {
      this.store.showNotif(
        'Please select a folder to upload file(s)',
        'custom'
      );
    } else {
      this.isUploadBatchPopupVisible = true;
    }
  }

  deleteFiles() {
    if (this.currentDirectory !== '') {
      if (this.selectedKeys.length !== 0) {
        this.fileStore
          .confirmDialog('Delete selected items?')
          .then((confirm: boolean) => {
            if (confirm) {
              this.fileStore
                // .deleteSelectedFiles(this.selectedKeys, this.currentDirectory)
                .deleteSelectedFiles(this.selectedKeys)
                .then(() => {
                  this.refresh();
                  this.store.showNotif(
                    `${this.selectedKeys.length} item deleted`,
                    'custom'
                  );
                  this.store.setIsLoading(false);
                });
            }
          });
      } else {
        this.store.showNotif('Nothing to delete!', 'custom');
      }
    }
  }

  clearClipboard() {
    if (this.tempCopyItems.length) {
      this.isMoving = false;
      this.isCopying = false;
      this.sourceDirectory = '';
      this.tempCopyItems = [];
      this.store.showNotif(`Clipboard cleared!`, 'custom');
    } else {
      this.store.showNotif('No item is copied or cut!', 'custom');
    }
  }

  copyFiles() {
    if (this.selectedKeys.length !== 0) {
      this.isMoving = false;
      this.isCopying = true;
      this.sourceDirectory = this.currentDirectory;
      this.tempCopyItems = this.selectedKeys;
      this.store.showNotif(
        `Copied ${this.selectedKeys.length} item(s)`,
        'custom'
      );
    } else {
      this.store.showNotif('No item selected!', 'custom');
    }
  }

  moveFiles() {
    if (this.selectedKeys.length !== 0) {
      this.isCopying = false;
      this.isMoving = true;
      this.sourceDirectory = this.currentDirectory;
      this.tempCopyItems = this.selectedKeys;
      this.store.showNotif(`Cut ${this.selectedKeys.length} item(s)`, 'custom');
    } else {
      this.store.showNotif('No item selected!', 'custom');
    }
  }

  pasteFiles() {
    if (this.tempCopyItems.length !== 0) {
      const editorMode = this.checkEditorMode();
      switch (editorMode) {
        case 'copy':
          this.performCopy();
          break;
        case 'move':
          this.performMove();
          break;
        default:
          break;
      }
    }
  }

  performCopy() {
    this.fileStore
      .confirmDialog(`Paste in ${this.currentDirectory} folder?`)
      .then((confirm: boolean) => {
        if (confirm) {
          this.isCopying = false;
          this.fileStore
            .copySelectedFiles(this.tempCopyItems, this.currentDirectory)
            .then((data: any) => {
              this.refresh();
              this.store.showNotif(data.responseMessage, 'custom');
              this.store.setIsLoading(false);
              this.tempCopyItems = [];
            })
            .catch((error) => {
              this.store.showNotif(error, 'error');
            });
        }
      });
  }

  performMove() {
    this.fileStore
      .confirmDialog(`Paste in ${this.currentDirectory} folder?`)
      .then((confirm: boolean) => {
        if (confirm) {
          this.isMoving = false;
          this.fileStore
            .moveSelectedFiles(this.tempCopyItems, this.currentDirectory)
            .then((data: any) => {
              this.refresh();
              this.store.showNotif(data.responseMessage, 'custom');
              this.store.setIsLoading(false);
              this.tempCopyItems = [];
            })
            .catch((error) => {
              this.store.showNotif(error.responseMessage, 'error');
            });
        }
      });
  }

  deleteSelectedImage() {
    if (this.currentDirectory !== '') {
      if (this.selectedItemKey.length !== 0) {
        this.fileStore
          .confirmDialog('Delete this item?')
          .then((confirm: boolean) => {
            if (confirm) {
              this.fileStore
                .deleteSelectedFiles([this.selectedItemKey])
                .then(() => {
                  this.refresh();
                  this.store.showNotif('1 item deleted', 'custom');
                  this.store.setIsLoading(false);
                });
            }
          });
      }
    }
  }

  updateFile() {
    if (this.currentDirectory !== '') {
      this.isUpdateFilePopupVisible = true;
    }
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

  showKeyShortcut() {
    this.isKeyShortcutPopupVisible = true;
  }

  checkEditorMode() {
    if (this.isCopying) {
      return 'copy';
    }
    if (this.isMoving) {
      return 'move';
    }
    return '';
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
      case 'renameFile':
        this.renameFile();
        break;
      case 'deleteImage':
        this.deleteSelectedImage();
        break;
      case 'updateFile':
        this.updateFile();
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

  navigateToStatistics() {
    this.router.navigate(['/statistics']);
  }

  fileDataListener() {
    return this.fileStore.$fileList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.fileList = data;
        console.log('FILE LIST OF FILE MANAGEMENT');
        console.log(this.fileList);
      }
    });
  }

  isUploadingFilesListener() {
    return this.fileStore.$isUploadingFiles.subscribe((data: boolean) => {
      this.isUploadBatchPopupVisible = data;
      if (data === false) {
        this.refresh();
      }
    });
  }

  isUpdatingFileListener() {
    return this.fileStore.$isUpdatingFile.subscribe((data: boolean) => {
      this.isUpdateFilePopupVisible = data;
      if (data === false) {
        this.refresh();
      }
    });
  }

  isRenamingFileListener() {
    return this.fileStore.$isRenamingFile.subscribe((data: boolean) => {
      this.isRenameFilePopupVisible = data;
      if (data === false) {
        this.refresh();
      }
    });
  }

  isUploadingBatchListener() {
    return this.fileStore.$isUploading.subscribe((data: boolean) => {
      this.isUploadBatchPopupVisible = data;
      if (data === false) {
        this.refresh();
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

  overwriteKeyHandler() {
    const keyList = [
      'backspace',
      'tab',
      'enter',
      'escape',
      'pageUp',
      'pageDown',
      'end',
      'home',
      'leftArrow',
      'upArrow',
      'rightArrow',
      'downArrow',
      'del',
      'space',
      'F',
      'A',
      'asterisk',
      'minus',
    ];
    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i];
      // remove default handler to add custom handler
      this.dxFileManager?.instance.registerKeyHandler(key, () => {});
    }
  }

  handleOperation(keyList: Array<string>) {
    //todo: add select item with arrow logic?
    // disable browser default Ctr T, Ctr N key shortcut?
    console.log('COMBINATION');
    console.log(keyList);
    const isClearClipboard = keyList.find((e) => e === 'Escape');
    const isDeleteFile =
      keyList.find((e) => e === 'Delete') && this.isDirectorySelected === false;
    const isCopyFile =
      keyList.find((e) => e === 'Control') &&
      keyList.find((e) => e === 'c') &&
      this.isDirectorySelected === false;
    const isMoveFile =
      keyList.find((e) => e === 'Control') &&
      keyList.find((e) => e === 'x') &&
      this.isDirectorySelected === false;
    const isPasteFile =
      keyList.find((e) => e === 'Control') && keyList.find((e) => e === 'v');
    const isRenameFile =
      keyList.find((e) => e === 'F2') &&
      this.isDirectorySelected === false &&
      this.currentDirectory !== '';
    const isUpdateFile = keyList.find(
      (e) =>
        e === 'PageUp' &&
        this.isDirectorySelected === false &&
        this.currentDirectory !== ''
    );
    const isUploadBatch = keyList.find((e) => e === 'Insert');
    const isRenameFolder =
      keyList.find((e) => e === 'F2') &&
      this.isDirectorySelected === true &&
      this.currentDirectory !== '';
    const isNewFolder =
      keyList.find((e) => e === 'Control') &&
      keyList.find((e) => e === 'ArrowUp');
    const isDeleteFolder =
      keyList.find((e) => e === 'Delete') && this.isDirectorySelected === true;
    if (isClearClipboard) {
      this.clearClipboard();
      this.keyCombination = [];
    }
    if (isDeleteFile) {
      this.deleteFiles();
      this.keyCombination = [];
    }
    if (isUpdateFile) {
      this.updateFile();
      this.keyCombination = [];
    }
    if (isRenameFile) {
      this.renameFile();
      this.keyCombination = [];
    }
    if (isUploadBatch) {
      this.uploadBatch();
      this.keyCombination = [];
    }
    if (isCopyFile) {
      this.copyFiles();
      this.keyCombination = [];
    }
    if (isMoveFile) {
      this.moveFiles();
      this.keyCombination = [];
    }
    if (isPasteFile) {
      this.pasteFiles();
      this.keyCombination = [];
    }
    if (isUpdateFile) {
      this.updateFile();
    }
  }

  ngOnInit(): void {
    this.getMetaData();
    this.isUpdatingFileListener();
    this.isRenamingFileListener();
    this.isUploadingFilesListener();
    setTimeout(() => {
      this.overwriteKeyHandler();
    }, 1500);
  }

  ngOnDestroy(): void {
    this.getMetaData().unsubscribe();
    this.containerDataListener().unsubscribe();
    this.fileDataListener().unsubscribe();
    this.isUpdatingFileListener().unsubscribe();
    this.isRenamingFileListener().unsubscribe();
    this.isUploadingFilesListener().unsubscribe();
  }
}
