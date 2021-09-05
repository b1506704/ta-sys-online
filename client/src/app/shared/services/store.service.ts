import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { StateService } from './state.service';

interface StoreState {
  userList: Array<User>;
  selectedUser: Object;
  currentUser: Object;
  currentRoleId: string;
  currentRoleName: string;
  isLoading: boolean;
  isPreloading: boolean;
  notifType: string;
  responseMsg: string;
}
const initialState: StoreState = {
  userList: [],
  isPreloading: true,
  selectedUser: {},
  currentUser: {},
  currentRoleId: '',
  currentRoleName: '',
  isLoading: false,
  responseMsg: '',
  notifType: '',
};
@Injectable({
  providedIn: 'root',
})
export class StoreService extends StateService<StoreState> {
  constructor() {
    super(initialState);
    this.loadDataAsync();
  }

  $isLoading: Observable<boolean> = this.select((state) => state.isLoading);

  $isPreloading: Observable<boolean> = this.select(
    (state) => state.isPreloading
  );

  $responseMsg: Observable<string> = this.select((state) => state.responseMsg);

  $notifType: Observable<string> = this.select((state) => state.notifType);

  $currentUser: Observable<Object> = this.select((state) => state.currentUser);

  $currentRoleId: Observable<string> = this.select(
    (state) => state.currentRoleId
  );

  $currentRoleName: Observable<string> = this.select(
    (state) => state.currentRoleName
  );

  loadDataAsync() {}

  setIsLoading(_isLoading: boolean) {
    this.setState({ isLoading: _isLoading });
  }

  setisPreloading(_isPreloading: boolean) {
    this.setState({ isPreloading: _isPreloading });
  }

  setResponseMsg(message: string) {
    this.setState({ responseMsg: message });
  }

  setNotifType(type: string) {
    this.setState({ notifType: type });
  }

  setCurrentUser(_user: Object) {
    this.setState({ currentUser: _user });
  }

  setCurrentUserRoleId(id: string) {
    this.setState({ currentRoleId: id });
  }

  setCurrentUserRoleName(role: string) {
    this.setState({ currentRoleName: role });
  }

  showNotif(message: string, type: string) {
    notify({ message: message, width: 150 }, type);
    this.setResponseMsg(message);
  }
}
