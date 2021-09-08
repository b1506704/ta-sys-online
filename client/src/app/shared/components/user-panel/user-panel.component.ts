import { Component, NgModule, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { StoreService } from '../../services/store.service';
import { Image } from '../../models/image';
import { ImageStore } from '../../services/image/image-store.service';

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
  userImage: Image = {
    container: '',
    sourceID: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };

  constructor(
    private store: StoreService,
    private imageStore: ImageStore
  ) {}

  userDataListener() {
    return this.store.$currentUser.subscribe((data: any) => {
      if (data !== null) {
        this.currentUser = data;
      }
    });
  }    

  imageDataListener() {
    return this.imageStore.$imageInstance.subscribe((data: any) => {
      if (data !== null) {
        console.log('IMAGE DATA');
        console.log(data);
        this.userImage = data;
      }
    });
  }
  
  ngOnInit(): void {
    this.userDataListener();
  }
  ngOnDestroy(): void {
    this.userDataListener().unsubscribe();
    // this.imageDataListener().unsubscribe();
  }
}

@NgModule({
  imports: [DxListModule, DxContextMenuModule, CommonModule],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule {}
