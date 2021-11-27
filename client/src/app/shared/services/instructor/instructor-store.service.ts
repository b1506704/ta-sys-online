import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../../models/instructor';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { InstructorHttpService } from './instructor-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { UserHttpService } from '../user/user-http.service';
import { FileStore } from '../file/file-store.service';

interface InstructorState {
  instructorList: Array<Instructor>;
  exportData: Array<Instructor>;
  selectedInstructor: Object;
  instructorInstance: Instructor;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: InstructorState = {
  instructorList: [],
  selectedInstructor: {},
  instructorInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class InstructorStore extends StateService<InstructorState> {
  constructor(
    private userService: UserHttpService,
    private fileStore: FileStore,
    private store: StoreService
  ) {
    super(initialState);
  }

  fetchMediaBySourceID(sourceIDs: Array<string>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  initInfiniteData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.setIsLoading(true);
    return this.userService
      .filterUserByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infite list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        this.store.setIsLoading(false);
      });
  }

  loadInfiniteDataAsync(
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
          if (data.data.length) {
            this.setState({
              instructorList: this.state.instructorList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Infinite list');
          console.log(this.state.instructorList);
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

  initInfiniteSearchByPropertyData(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    //
    this.userService
      .filterSearchUserByProperty(
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
            instructorList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initInfiniteSortByPropertyData(
    filterProperty: string,
    filterValue: string,
    sortProperty: string,
    sortValue: string,
    page: number,
    size: number
  ) {
    //
    this.userService
      .filterSortUserByProperty(
        filterProperty,
        filterValue,
        sortProperty,
        sortValue,
        page,
        size
      )
      .toPromise()
      .then((data: any) => {
        this.setState({
          instructorList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: sort list');
        console.log(this.state.instructorList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $instructorList: Observable<Array<Instructor>> = this.select(
    (state) => state.instructorList
  );

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);
  searchInfiniteInstructorByProperty(
    filterProperty: string,
    filterValue: string,
    searchProperty: string,
    searchValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .filterSearchUserByProperty(
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
                instructorList: this.state.instructorList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Infite searched list');
          console.log(this.state.instructorList);
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

  sortInfiniteInstructorByProperty(
    filterValue: string,
    filterProperty: string,
    sortProperty: string,
    sortValue: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.userService
      .filterSortUserByProperty(
        filterValue,
        filterProperty,
        sortProperty,
        sortValue,
        page,
        size
      )
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              instructorList: this.state.instructorList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Infite sorted list');
          console.log(this.state.instructorList);
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
