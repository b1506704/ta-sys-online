import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../models/test';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { TestHttpService } from './test-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { FileStore } from '../file/file-store.service';
import { TestRequest } from '../../models/testRequest';
import { Question } from '../../models/question';

interface TestState {
  testList: Array<Test>;
  testRequest: TestRequest;
  exportData: Array<Test>;
  selectedTest: Object;
  isCreating: boolean;
  testInstance: Test;
  totalPages: number;
  savedAnswerIds: Array<string>;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: TestState = {
  testList: [],
  testRequest: {
    testId: '',
    userId: '',
    isPractice: false,
    questionRequest: [],
  },
  savedAnswerIds: [],
  selectedTest: {},
  isCreating: undefined,
  testInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class TestStore extends StateService<TestState> {
  constructor(
    private testService: TestHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {
    super(initialState);
  }
  //
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<Test>,
    addedArray: Array<Test>
  ): Array<Test> {
    let result: Array<Test> = sourceArray;
    console.log('FILL INDEX');
    let fillIndex = startIndex * endIndex;
    console.log(fillIndex);
    for (var j = 0; j < addedArray.length; j++) {
      result[fillIndex] = addedArray[j];
      fillIndex++;
    }
    // endIndex = pageSize
    // pageSize = 5
    // 0 => 0,1,2,3,4,
    // 1 -> 5,6,7,8,9
    // 2 -> 10,11,12,13,14
    // 17 -> 85,86,87,88,89
    console.log('Filled array result');
    console.log(result);
    return result;
  }

  fetchMediaBySourceID(sourceIDs: Array<string>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  initData(page: number, size: number) {
    this.testService
      .fetchTest(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.testService
      .filterTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: data.data,
        });
        // this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infinite filtered list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.testService
      .filterTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterTestByProperty(property, value, page, size);
      });
  }

  initSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .sortTestByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortTestByProperty(value, order, page, size);
      });
  }

  initSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .searchTestByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: new Array<Test>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchTestByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterSearchByPropertyData(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .filterSearchTestByProperty(
        filterProperty,
        filterValue,
        searchProperty,
        searchValue,
        page,
        size
      )
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            testList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initInfiniteSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    //
    this.testService
      .sortTestByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: sort list');
        console.log(this.state.testList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.testService.fetchTest(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          testList: this.fillEmpty(
            page - 1,
            size,
            this.state.testList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.testList);
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

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $testList: Observable<Array<Test>> = this.select((state) => state.testList);
  $testRequest: Observable<TestRequest> = this.select(
    (state) => state.testRequest
  );

  $saveAnswerIds: Observable<Array<string>> = this.select(
    (state) => state.savedAnswerIds
  );

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $isCreating: Observable<boolean> = this.select((state) => state.isCreating);

  uploadTest(test: Test, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.uploadTest(test).subscribe({
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

  updateTest(test: Test, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.updateTest(test).subscribe({
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
        this.testService.deleteAll().subscribe({
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

  deleteTest(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.testService.deleteTest(id).subscribe({
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

  filterTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              testList: this.fillEmpty(
                page - 1,
                size,
                this.state.testList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.testList);
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

  filterInfiniteTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              testList: this.state.testList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Filtered list');
          console.log(this.state.testList);
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

  filterSearchInfiniteTestByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterSearchTestByProperty(
        filterProperty,
        filterValue,
        searchProperty,
        searchValue,
        page,
        size
      )
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            if (data.data.length) {
              this.setState({
                testList: this.state.testList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Infite searched list');
          console.log(this.state.testList);
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

  searchTestByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .searchTestByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              testList: this.fillEmpty(
                page - 1,
                size,
                this.state.testList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.testList);
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

  sortTestByProperty(value: string, order: string, page: number, size: number) {
    this.setIsLoading(true);
    this.testService.sortTestByProperty(value, order, page, size).subscribe({
      next: (data: any) => {
        this.setState({ responseMsg: data });
        this.setState({
          testList: this.fillEmpty(
            page - 1,
            size,
            this.state.testList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Sorted list');
        console.log(this.state.testList);
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

  sortInfiniteTestByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService.sortTestByProperty(value, order, page, size).subscribe({
      next: (data: any) => {
        if (data.data.length) {
          this.setState({
            testList: this.state.testList.concat(data.data),
          });
          this.fetchMediaBySourceID(data.data);
        }
        console.log('Infite sorted list');
        console.log(this.state.testList);
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

  findIndexByProperty(data: Array<any>, key: any, value: any) {
    for (var i = 0; i < data.length; i++) {
      if (data[i][key] == value) {
        return i;
      }
    }
    return -1;
  }

  addQuestionToTestRequest(question: Question) {
    const currentTestRequest = this.state.testRequest;
    var updatedIndex = this.findIndexByProperty(
      currentTestRequest.questionRequest,
      'id',
      question.id
    );
    if (updatedIndex > -1) {
      currentTestRequest.questionRequest[updatedIndex] = question;
    } else {
      currentTestRequest.questionRequest.push(question);
    }
    this.setState({ testRequest: currentTestRequest });
    console.log(this.state.testRequest);
  }

  addAnswerIds(id: string) {
    const currentAnswerIds = this.state.savedAnswerIds;
    var updatedIndex = this.state.savedAnswerIds.findIndex(
      (e: string) => e === id
    );
    if (updatedIndex > -1) {
      currentAnswerIds[updatedIndex] = id;
    } else {
      currentAnswerIds.push(id);
    }
    this.setState({ savedAnswerIds: currentAnswerIds });
    console.log(this.state.savedAnswerIds);
  }

  setTestRequestId(testId: string) {
    const currentTestRequest = this.state.testRequest;
    currentTestRequest.testId = testId;
    this.setState({ testRequest: currentTestRequest });
  }

  setIsCreating(isCreating: boolean) {
    this.setState({ isCreating: isCreating });
  }

  setExportData(array: Array<Test>) {
    this.setState({ testList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
