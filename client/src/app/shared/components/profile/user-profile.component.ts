import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user';
import { DxFormComponent } from 'devextreme-angular';
import { ImageStore } from '../../services/image/image-store.service';
import { Image } from '../../models/image';
import { UserStore } from '../../services/user/user-store.service';
import { UserInfoStore } from '../../services/user-info/user-info-store.service';
import { UserInfo } from '../../models/userinfo';
@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  submitUserAccountButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetUserAccountButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.form.instance.resetValues();
      this.form.instance.getEditor('username').focus();
    },
  };
  submitUserInfoButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetUserInfoButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.getUserAccountData(this.currentUserId);
      this.getUserInfoData(this.currentUserId);
      this.imageData.url = '../../../../assets/imgs/profile.png';
    },
  };
  userAccountData!: User;
  userInfoData!: UserInfo;
  currentUserId!: string;
  genderList: Array<Object> = [
    {
      id: '(NONE)',
      name: '(NONE)',
    },
    {
      id: '0',
      name: 'Male',
    },
    {
      id: '1',
      name: 'Female',
    },
  ];
  imageData: Image = {
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
    private userAccountStore: UserStore,
    private userInfoStore: UserInfoStore,
    private imageStore: ImageStore
  ) {}

  onFormShown(e: any) {
    setTimeout(() => {
      this.form.instance.getEditor('username').focus();
    }, 200);
  }

  onUserAccountSubmit = (e: any) => {
    e.preventDefault();
    this.userAccountStore.updateUser(this.userAccountData, 1, 5);
  };

  onUserInfoSubmit = (e: any) => {
    e.preventDefault();
    // also update image
    this.userInfoStore.updateUserInfo(this.userInfoData, 1, 5);
  };

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    if (file !== undefined) {
      if (file.size <= 2000000) {
        this.imageData.fileSize = file.size;
        this.imageData.fileType = file.type;
        this.imageData.fileName = file.name;
        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
          this.store.showNotif('Invalid format!', 'custom');
          return;
        }
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      } else {
        this.store.showNotif('Image cannot exceed 2MB', 'custom');
      }
    }
  }

  handleReaderLoaded(e: any) {
    var reader = e.target;
    console.log('READER');
    console.log(reader);
    this.imageData.url = reader.result;
    console.log('SOURCE ID');
    console.log(this.imageData.sourceID);
  }

  userAccountDataListener() {
    return this.userAccountStore.$userInstance.subscribe((data: any) => {
      if (data !== null) {
        this.userAccountData = data;
      }
    });
  }

  userInfoDataListener() {
    return this.userInfoStore.$userInfoInstance.subscribe((data: any) => {
      if (data !== null) {
        this.userInfoData = data;
        // this.imageStore.getImageBySourceID(data.id).then(() => {
        //   this.imageDataListener();
        // });
      }
    });
  }

  imageDataListener() {
    return this.imageStore.$imageInstance.subscribe((data: any) => {
      if (data !== null) {
        console.log('IMAGE DATA');
        console.log(data);
        this.imageData = data;
      }
    });
  }

  userIdListener() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentUserId = data;
        this.getUserAccountData(data);
        this.getUserInfoData(data);
      }
    });
  }

  getUserAccountData(id: string) {
    this.userAccountStore.getUser(id).then(() => {
      this.userAccountDataListener();
    });
  }

  getUserInfoData(id: string) {
    this.userInfoStore.getUserInfo(id).then(() => {
      this.userInfoDataListener();
    });
  }

  onGenderChange(e: any) {
    this.userInfoData.gender = e.value;
  }

  ngOnInit(): void {
    this.userIdListener();
  }

  ngOnDestroy(): void {
    this.userAccountDataListener().unsubscribe();
    this.userInfoDataListener().unsubscribe();
    // this.imageDataListener().unsubscribe();
  }
}
