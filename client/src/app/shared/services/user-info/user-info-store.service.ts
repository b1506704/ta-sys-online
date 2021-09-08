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
    sourceArray: Array<UserInfo>,
    addedArray: Array<UserInfo>
  ): Array<UserInfo> {
    let result: Array<UserInfo> = sourceArray;
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

  initInfiniteData(page: number, size: number) {
    this.store.setIsLoading(true);
    return this.userInfoService
      .fetchUserInfo(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.userInfoList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.userInfoService.fetchUserInfo(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          userInfoList: this.state.userInfoList.concat(data.data),
        });
        console.log('Infinite list');
        console.log(this.state.userInfoList);
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
    this.userInfoService
      .fetchUserInfoByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            userInfoList: this.fillEmpty(
              page - 1,
              size,
              this.state.userInfoList,
              data.data
            ),
          });
          console.log('Pure list');
          console.log(this.state.userInfoList);
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
    return this.userInfoService
      .fetchUserInfoByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: data.data,
        });
        console.log('Current flag: infite list');
        console.log(this.state.userInfoList);
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
    this.userInfoService
      .fetchUserInfoByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            userInfoList: this.state.userInfoList.concat(data.data),
          });
          console.log('Infinite list');
          console.log(this.state.userInfoList);
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
    this.userInfoService
      .fetchUserInfo(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: new Array<UserInfo>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.userInfoList);
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
    this.userInfoService
      .filterUserInfoByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: new Array<UserInfo>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.userInfoList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterUserInfoByProperty(property, value, page, size);
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
    this.userInfoService
      .filterUserInfoByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: data.data,
        });
        console.log('Current flag: infinite filtered list');
        console.log(this.state.userInfoList);
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
    this.userInfoService
      .searchUserInfoByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: new Array<UserInfo>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.userInfoList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchUserInfoByProperty(property, value, page, size);
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
    this.userInfoService
      .searchUserInfoByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            userInfoList: data.data,
          });
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.userInfoList);
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
    this.userInfoService
      .sortUserInfoByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: new Array<UserInfo>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.userInfoList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortUserInfoByProperty(value, order, page, size);
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
    this.userInfoService
      .sortUserInfoByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          userInfoList: data.data,
        });
        console.log('Current flag: sort list');
        console.log(this.state.userInfoList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.userInfoService.fetchUserInfo(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          userInfoList: this.fillEmpty(
            page - 1,
            size,
            this.state.userInfoList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.userInfoList);
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
    this.userInfoService.fetchUserInfo(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          userInfoList: this.fillEmpty(
            page - 1,
            size,
            this.state.userInfoList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.userInfoList);
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

  $userInfoList: Observable<Array<UserInfo>> = this.select(
    (state) => state.userInfoList
  );

  $roleList: Observable<Array<any>> = this.select((state) => state.roleList);

  $exportData: Observable<Array<UserInfo>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedUserInfo: Observable<Object> = this.select(
    (state) => state.selectedUserInfo
  );

  $userInfoInstance: Observable<UserInfo> = this.select(
    (state) => state.userInfoInstance
  );

  uploadUserInfo(userInfo: UserInfo, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userInfoService.uploadUserInfo(userInfo).subscribe({
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

  updateUserInfo(userInfo: UserInfo, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userInfoService.updateUserInfo(userInfo).subscribe({
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

  deleteSelectedUserInfos(
    selectedUserInfos: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userInfoService.deleteUserInfo(selectedUserInfos).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.userInfoList);
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
        this.userInfoService.deleteAll().subscribe({
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

  deleteUserInfo(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.userInfoService.deleteUserInfo(id).subscribe({
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

  selectUserInfo(_userInfo: UserInfo) {
    this.setState({ selectedUserInfo: _userInfo });
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

  filterUserInfoByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userInfoService
      .filterUserInfoByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              userInfoList: this.fillEmpty(
                page - 1,
                size,
                this.state.userInfoList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.userInfoList);
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

  filterInfiniteUserInfoByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userInfoService
      .filterUserInfoByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            userInfoList: this.state.userInfoList.concat(data),
          });
          console.log('Filtered list');
          console.log(this.state.userInfoList);
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

  searchUserInfoByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userInfoService
      .searchUserInfoByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              userInfoList: this.fillEmpty(
                page - 1,
                size,
                this.state.userInfoList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.userInfoList);
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

  searchInfiniteUserInfoByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userInfoService
      .searchUserInfoByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              userInfoList: this.state.userInfoList.concat(data),
            });
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
          console.log(this.state.userInfoList);
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

  sortUserInfoByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userInfoService
      .sortUserInfoByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            userInfoList: this.fillEmpty(
              page - 1,
              size,
              this.state.userInfoList,
              data.data
            ),
          });
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          console.log('Sorted list');
          console.log(this.state.userInfoList);
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

  sortInfiniteUserInfoByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userInfoService
      .sortUserInfoByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({
            userInfoList: this.state.userInfoList.concat(data),
          });
          console.log('Infite sorted list');
          console.log(this.state.userInfoList);
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

  setExportData(array: Array<UserInfo>) {
    this.setState({ userInfoList: array });
  }

  resetState() {
    this.setState(initialState);
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }
}
