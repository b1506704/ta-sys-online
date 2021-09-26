import { Component, NgModule, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { StoreService } from '../../services/store.service';
import { File } from '../../models/file';
import { FileStore } from '../../services/file/file-store.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, OnDestroy {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;
  currentUser!: string;
  currentRoleName!: string;
  userFile: File = {
    container: '',
    sourceID: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };

  constructor(private store: StoreService, private fileStore: FileStore) {}

  userDataListener() {
    return this.store.$currentUser.subscribe((data: any) => {
      if (data !== null) {
        this.currentUser = data;
      }
    });
  }

  userIdListener() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.getUserMediaData(data);
      }
    });
  }

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data !== null) {
        this.userFile = data.data[0];
      }
    });
  }

  ngOnInit(): void {
    this.userIdListener();
    this.userDataListener();
  }
  ngOnDestroy(): void {
    this.userDataListener().unsubscribe();
    this.userIdListener().unsubscribe();
  }
}

@NgModule({
  imports: [DxListModule, DxContextMenuModule, CommonModule],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule {}
