import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestResult } from '../../models/test-result';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { TestResultHttpService } from './test-result-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { FileStore } from '../file/file-store.service';

interface TestResultState {
  testResultList: Array<TestResult>;
  exportData: Array<TestResult>;
  selectedTestResult: Object;
  isCreating: boolean;
  testResultInstance: TestResult;
  totalPages: number;
  savedAnswerIds: Array<string>;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: TestResultState = {
  testResultList: [],
  savedAnswerIds: [],
  selectedTestResult: {},
  isCreating: undefined,
  testResultInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class TestResultStore extends StateService<TestResultState> {
  constructor(
    private testService: TestResultHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {
    super(initialState);
  }

  fetchMediaBySourceID(sourceIDs: Array<string>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    //;
    this.testService
      .filterTestResultByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          testResultList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infinite filtered list');
        console.log(this.state.testResultList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $testResultList: Observable<Array<TestResult>> = this.select(
    (state) => state.testResultList
  );

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  filterInfiniteTestResultByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.testService
      .filterTestResultByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              testResultList: this.state.testResultList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Filtered list');
          console.log(this.state.testResultList);
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
}
