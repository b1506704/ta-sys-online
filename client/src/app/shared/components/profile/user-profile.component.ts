import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { User } from '../../models/user';
import { DxFormComponent } from 'devextreme-angular';
import { UserStore } from '../../services/user/user-store.service';
import { UserInfoStore } from '../../services/user-info/user-info-store.service';
import { UserInfo } from '../../models/userinfo';
import { FileStore } from '../../services/file/file-store.service';
import { File } from '../../models/file';
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
  submitUserPasswordButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetUserPasswordButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.userPasswordData = {
        oldPassword: '',
        newPassword: '',
      };
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
      this.fileData.url = '../../../../assets/imgs/profile.png';
    },
  };
  userAccountData!: User;
  userPasswordData: any = {
    oldPassword: '',
    newPassword: '',
  };
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
  fileData: File = {
    container: '',
    sourceID: '',
    category: '',
    title: '',
    data: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };

  constructor(
    private store: StoreService,
    private userAccountStore: UserStore,
    private userInfoStore: UserInfoStore,
    private fileStore: FileStore
  ) {}

  onFormShown(e: any) {
    setTimeout(() => {
      this.form.instance.getEditor('username').focus();
    }, 200);
  }

  onUserPasswordSubmit = (e: any) => {
    e.preventDefault();
    this.userAccountStore.changePassword(
      this.currentUserId,
      this.userPasswordData.oldPassword,
      this.userPasswordData.newPassword
    );
  };

  onUserAccountSubmit = (e: any) => {
    e.preventDefault();
    this.userAccountStore.updateUser(this.userAccountData, 1, 5);
    // this.fileStore.uploadFiles([this.fileData]);
  };

  onUserInfoSubmit = (e: any) => {
    e.preventDefault();
    // also update file
    this.userInfoStore.updateUserInfo(this.userInfoData);
    this.fileStore.uploadFiles([this.fileData]);
  };

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    if (file !== undefined) {
      if (file.size <= 2000000) {
        this.fileData.fileSize = file.size;
        this.fileData.fileType = file.type;
        this.fileData.fileName = file.name;
        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
          this.store.showNotif('Invalid format!', 'custom');
          return;
        }
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      } else {
        this.store.showNotif('File cannot exceed 2MB', 'custom');
      }
    }
  }

  handleReaderLoaded(e: any) {
    var reader = e.target;
    console.log('READER');
    console.log(reader);
    this.fileData.sourceID = this.currentUserId;
    this.fileData.container = 'images';
    this.fileData.category = 'images';
    this.fileData.title = this.userAccountData.displayName;
    this.fileData.data = reader.result.split(',')[1];
    this.fileData.url = reader.result;
    console.log('SOURCE ID');
    console.log(this.fileData.sourceID);
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
      }
    });
  }

  userIdListener() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentUserId = data;
        this.getUserAccountData(data);
        this.getUserInfoData(data);
        this.getUserMediaData(data);
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

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data !== null) {
        this.fileData = data.data[0];
      }
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
  }
}
