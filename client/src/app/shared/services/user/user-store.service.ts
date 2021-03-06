import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { UserHttpService } from './user-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { Router } from '@angular/router';
interface UserState {
  userList: Array<User>;
  roleList: Array<any>;
  selectedUser: Object;
  userInstance: User;
  exportData: Array<User>;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
  isLoggedIn: boolean;
  isShowLoginPopup: boolean;
  isShowSignupPopup: boolean;
}
const initialState: UserState = {
  userList: [],
  roleList: [],
  selectedUser: {},
  userInstance: null,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
  isLoggedIn: localStorage.getItem('access_token') !== null,
  isShowLoginPopup: false,
  isShowSignupPopup: false,
};
@Injectable({
  providedIn: 'root',
})
export class UserStore extends StateService<UserState> {
  constructor(
    private userService: UserHttpService,
    private store: StoreService,
    private router: Router
  ) {
    super(initialState);
    this.$isLoggedIn.subscribe((data: any) => {
      if (data === true) {
        this.store.setCurrentUser(this.getUsername());
        this.store.setCurrentUserId(this.getUserId());
        this.store.setCurrentUserRoleId(this.getRoleId());
        this.store.setIsPreloading(true);
        this.dynamicRouting();
      }
    });
  }
  //
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<User>,
    addedArray: Array<User>
  ): Array<User> {
    let result: Array<User> = sourceArray;
    let fillIndex = startIndex * endIndex;
    for (var j = 0; j < addedArray.length; j++) {
      result[fillIndex] = addedArray[j];
      fillIndex++;
    }
    // endIndex = pageSize
    // pageSize = 5
    // 0 => 0 ,1,2,3,4,
    // 1 -> 5,6,7,8,9
    // 2 -> 10,11,12,13,14
    // 17 -> 85,86,87,88,89
    console.log('Filled array result');
    console.log(result);
    return result;
  }

  getRole() {
    return this.userService
      .fetchRole()
      .toPromise()
      .then((data: any) => {
        if (data.length) {
          const temp = data;
          temp.unshift({ id: '(NONE)', name: '(NONE)' });
          this.setState({
            roleList: temp,
          });
          console.log(data);
        }
      });
  }

  dynamicRouting() {
    this.getRole().then(() => {
      const roleName = this.state.roleList.find(
        (e: any) => e.id === this.getRoleId()
      )?.name;
      this.store.setCurrentUserRoleName(roleName);
      switch (roleName) {
        case 'Admin':
          this.router.navigate(['/edit_user_list']);
          break;
        case 'Instructor':
          this.router.navigate(['/course_instructor']);
          break;
        case 'Learner':
          this.router.navigate(['/learner_course']);
          break;
        case undefined:
          this.router.navigate(['/landing_page']);
          break;
        default:
          break;
      }
      this.store.setIsPreloading(false);
      console.log(roleName);
    });
  }

  initData(page: number, size: number) {
    this.store.setIsLoading(true);
    this.userService
      .fetchUser(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: new Array<User>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.store.setIsLoading(true);
    this.userService
      .filterUserByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: new Array<User>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterUserByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.store.setIsLoading(true);
    this.userService
      .filterUserByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: data.data,
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  initSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //
    this.store.setIsLoading(true);
    this.userService
      .searchUserByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: new Array<User>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchUserByProperty(property, value, page, size);
      });
  }

  initSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.store.setIsLoading(true);
    this.userService
      .sortUserByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: new Array<User>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortUserByProperty(value, order, page, size);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.userService.fetchUser(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          userList: this.fillEmpty(
            page - 1,
            size,
            this.state.userList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.userList);
        console.log('Server response');
        console.log(data);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  $isLoggedIn: Observable<boolean> = this.select((state) => state.isLoggedIn);

  $isShowLoginPopup: Observable<boolean> = this.select(
    (state) => state.isShowLoginPopup
  );

  $isShowSignupPopup: Observable<boolean> = this.select(
    (state) => state.isShowSignupPopup
  );

  $userList: Observable<Array<User>> = this.select((state) => state.userList);

  $roleList: Observable<Array<any>> = this.select((state) => state.roleList);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $userInstance: Observable<User> = this.select((state) => state.userInstance);

  uploadUser(user: any, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userService.uploadUser(user).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems + 1);
            console.log(data);
            this.loadDataAsync(page, size);
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

  updateUser(user: User, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userService.updateUser(user).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
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

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  deleteAll() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userService.deleteAll().subscribe({
          next: (data: any) => {
            this.resetState();
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

  deleteUser(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userService.deleteUser(id).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems - 1);
            console.log(data);
            this.loadDataAsync(page, size);
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

  setTotalItems(_totalItems: number) {
    this.setState({ totalItems: _totalItems });
  }

  setIsShowLoginPopup(isShow: boolean) {
    this.setState({ isShowLoginPopup: isShow });
  }

  setIsShowSignupPopup(isShow: boolean) {
    this.setState({ isShowSignupPopup: isShow });
  }

  filterUserByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .filterUserByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              userList: this.fillEmpty(
                page - 1,
                size,
                this.state.userList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.userList);
            console.log('Server response');
            console.log(data);
            this.setState({ totalItems: data.totalRecords });
            this.setState({ totalPages: data.totalPages });
            this.setState({ currentPage: data.pageNumber });
          }
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  searchUserByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .searchUserByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              userList: this.fillEmpty(
                page - 1,
                size,
                this.state.userList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.userList);
          console.log('Server response');
          console.log(data);
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  sortUserByProperty(value: string, order: string, page: number, size: number) {
    this.setIsLoading(true);
    this.userService.sortUserByProperty(value, order, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          userList: this.fillEmpty(
            page - 1,
            size,
            this.state.userList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Sorted list');
        console.log(this.state.userList);
        console.log('Server response');
        console.log(data);
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  getUser(id: string) {
    this.setIsLoading(true);
    return this.userService
      .getUser(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ userInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<User>) {
    this.setState({ userList: array });
  }

  resetState() {
    this.setState(initialState);
  }

  // general obs & functions

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getRoleId() {
    return localStorage.getItem('roleId');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  loginUser(user: any) {
    this.setIsLoading(true);
    this.userService.loginUser(user).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data.responseMessage });
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data.id);
        localStorage.setItem('roleId', data.roleId);
        localStorage.setItem('expiration', data.expiration);
        this.store.setCurrentUser(data.username);
        this.store.setCurrentUserId(data.id);
        this.store.setCurrentUserRoleId(data.roleId);
        this.setIsLoading(false);
        this.router.navigate(['/splash_screen']);
        setTimeout(() => {
          this.setState({ isLoggedIn: true });
          this.store.showNotif(data.responseMessage, 'custom');
          this.setIsShowLoginPopup(false);
        }, 2000);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  logoutUser() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('roleId');
    localStorage.removeItem('expiration');
    this.store.setCurrentUser('');
    this.store.setCurrentUserId('');
    this.store.setCurrentUserRoleId('');
    this.store.setCurrentUserRoleName('');
    this.setState({ isLoggedIn: false });
    this.setIsShowLoginPopup(true);
    this.store.showNotif('Logout successfully', 'custom');
  }

  changePassword(userId: string, oldPassword: string, newPassword: string) {
    this.setIsLoading(true);
    this.userService
      .changePassword(userId, oldPassword, newPassword)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data.responseMessage });
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

  signupUser(user: any) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userService.signupUser(user).subscribe({
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
}
