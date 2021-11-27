import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/userinfo';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { UserInfoHttpService } from './user-info-http.service';
import { confirm } from 'devextreme/ui/dialog';
interface UserInfoState {
  userInfoList: Array<UserInfo>;
  roleList: Array<any>;
  selectedUserInfo: Object;
  userInfoInstance: UserInfo;
  exportData: Array<UserInfo>;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
  isLoggedIn: boolean;
}
const initialState: UserInfoState = {
  userInfoList: [],
  roleList: [],
  selectedUserInfo: {},
  userInfoInstance: null,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
  isLoggedIn: localStorage.getItem('access_token') !== null,
};
@Injectable({
  providedIn: 'root',
})
export class UserInfoStore extends StateService<UserInfoState> {
  constructor(
    private userInfoService: UserInfoHttpService,
    private store: StoreService
  ) {
    super(initialState);
  }

  $userInfoInstance: Observable<UserInfo> = this.select(
    (state) => state.userInfoInstance
  );

  getUserInfo(id: string) {
    this.setIsLoading(true);
    return this.userInfoService
      .getUserInfo(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ userInfoInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  updateUserInfo(userInfo: UserInfo) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userInfoService.updateUserInfo(userInfo).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }
}
