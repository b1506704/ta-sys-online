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
  /**
   * This is a function which fills the items received from pagination in a specific store's state variable.
   * 
   * @author Le Bao Anh
   * @version 1.0.0
   * @param {number} startIndex - The current page of ss pagination
   * @param {number} endIndex - The page size of ss pagination
   * @param {Array<Object>} sourceArray - The source array/state in a specific store service
   * @param {Array<Object>} addedArray - The array of items received from ss pagination
   * @return {Array<Object>} Return an array with filled items from ss pagination
   * @example
   * this.setState({
            pendingCheckupList: this.fillEmpty(
              page,
              size,
              this.state.pendingCheckupList,
              data.items
            ),
          });
   */
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
          this.router.navigate(['/admin_home']);
          break;
        case 'Instructor':
          this.router.navigate(['/instructor_home']);
          break;
        case 'Learner':
          this.router.navigate(['/learner_home']);
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

  initInfiniteData(page: number, size: number) {
    this.store.setIsLoading(true);
    return this.userService
      .fetchUser(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.userService.fetchUser(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          userList: this.state.userList.concat(data.data),
        });
        console.log('Infinite list');
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

  loadDataAsyncByLearnerID(page: number, size: number, learnerID: string) {
    this.setIsLoading(true);
    this.userService.fetchUserByLearnerID(page, size, learnerID).subscribe({
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

  initInfiniteDataByLearnerID(page: number, size: number, learnerID: string) {
    return this.userService
      .fetchUserByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadInfiniteDataAsyncByLearnerID(
    page: number,
    size: number,
    learnerID: string
  ) {
    this.setIsLoading(true);
    this.userService.fetchUserByLearnerID(page, size, learnerID).subscribe({
      next: (data: any) => {
        this.setState({
          userList: this.state.userList.concat(data.data),
        });
        console.log('Infinite list');
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
    this.store.showNotif('Filtered Mode On', 'custom');
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
    this.store.showNotif('Filtered Mode On', 'custom');
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
    this.store.showNotif('Searched Mode On', 'custom');
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

  initInfiniteSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.store.setIsLoading(true);
    this.userService
      .searchUserByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            userList: data.data,
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  initSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Sort Mode On', 'custom');
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

  initInfiniteSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.store.setIsLoading(true);
    this.userService
      .sortUserByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userList: data.data,
        });
        console.log('Current flag: sort list');
        console.log(this.state.userList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
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

  refresh(page: number, size: number) {
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
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.userList);
        console.log('Server response');
        console.log(data);
        this.store.showNotif('Refresh successfully', 'custom');
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

  $userList: Observable<Array<User>> = this.select((state) => state.userList);

  $roleList: Observable<Array<any>> = this.select((state) => state.roleList);

  $exportData: Observable<Array<User>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedUser: Observable<Object> = this.select(
    (state) => state.selectedUser
  );

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

  deleteSelectedUsers(
    selectedUsers: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userService.deleteUser(selectedUsers).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.userList);
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

  selectUser(_user: User) {
    this.setState({ selectedUser: _user });
  }

  setTotalPages(_totalPages: number) {
    this.setState({ totalPages: _totalPages });
  }

  setTotalItems(_totalItems: number) {
    this.setState({ totalItems: _totalItems });
  }

  setCurrentPage(_currentPage: number) {
    this.setState({ currentPage: _currentPage });
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

  filterInfiniteUserByProperty(
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
          this.setState({
            userList: this.state.userList.concat(data),
          });
          console.log('Filtered list');
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

  searchInfiniteUserByProperty(
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
              userList: this.state.userList.concat(data),
            });
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
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

  sortInfiniteUserByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService.sortUserByProperty(value, order, page, size).subscribe({
      next: (data: any) => {
        this.setState({
          userList: this.state.userList.concat(data),
        });
        console.log('Infite sorted list');
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

  isLoggedIn() {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
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
    this.store.showNotif('Logout successfully', 'custom');
    this.router.navigate(['/login']);
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
