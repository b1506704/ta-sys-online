import { Component, NgModule, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user';
import { Image } from '../../models/image';
import { ImageStore } from '../../services/image/image-store.service';
import { Learner } from '../../models/learner';
import { LearnerStore } from '../../services/learner/learner-store.service';
import { InstructorStore } from '../../services/instructor/instructor-store.service';

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
  // user!: any;
  learnerData!: Learner;
  instructorData!: any;
  currentUser!: User;
  currentRoleName!: string;
  userImage: Image = {
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
    private learnerStore: LearnerStore,
    private instructorStore: InstructorStore,
    private imageStore: ImageStore
  ) {}

  userDataListener() {
    return this.store.$currentUser.subscribe((data: any) => {
      if (data !== null) {
        this.currentUser = data;
      }
    });
  }

  userRoleListener() {
    return this.store.$currentRoleName.subscribe((data: string) => {
      this.currentRoleName = data;
    });
  }

  learnerDataListener() {
    return this.learnerStore.$learnerInstance.subscribe((data: any) => {
      if (data !== undefined) {
        this.learnerData = data;
        this.imageStore.getImageBySourceID(data._id).then(() => {
          this.imageDataListener();
        });
      }
    });
  }

  instructorDataListener() {
    return this.instructorStore.$instructorInstance.subscribe((data: any) => {
      if (data !== undefined) {
        this.instructorData = data;
        this.imageStore.getImageBySourceID(data._id).then(() => {
          this.imageDataListener();
        });
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

  renderSourceData() {
    switch (this.currentRoleName) {
      case 'Learner':
        this.learnerStore
          .getLearnerByUserName(this.currentUser.username)
          .then(() => {
            this.learnerDataListener();
          });
        break;
      case 'Instructor':
        this.instructorStore
          .getInstructorByUserName(this.currentUser.username)
          .then(() => {
            this.instructorDataListener();
          });
        break;
      default:
        break;
    }
  }
  ngOnInit(): void {
    this.userDataListener();
    this.userRoleListener();
    // this.renderSourceData();
  }
  ngOnDestroy(): void {
    this.userDataListener().unsubscribe();
    this.userRoleListener().unsubscribe();
    // this.imageDataListener().unsubscribe();
  }
}

@NgModule({
  imports: [DxListModule, DxContextMenuModule, CommonModule],
  declarations: [UserPanelComponent],
  exports: [UserPanelComponent],
})
export class UserPanelModule {}
