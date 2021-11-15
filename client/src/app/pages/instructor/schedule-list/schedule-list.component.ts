import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/shared/models/session';
import { SessionStore } from 'src/app/shared/services/session/session-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { Subject } from 'src/app/shared/models/subject';
import { SubjectHttpService } from 'src/app/shared/services/subject/subject-http.service';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  sessionList!: Array<Session>; 
  subjectList: Array<Subject> = [];
  currentSessionID!: string;
  pageSize: number = 100;
  pullDown = false;
  updateContentTimer: any;
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;
  isSortingByPrice: boolean;
  isDetailPopupVisible: boolean = false;

  currentCategoryFilterValue: string;
  timeout: any;
  currentFilterByPropertyValue: string;
  currentSearchByPropertyValue: string;
  currentSortByPropertyValue: string;
  currentSortProperty: string = 'cost';
  currentSearchProperty: string = 'name';
  currentFilterProperty: string = 'courseId';

  searchBoxOptions: any = {
    valueChangeEvent: 'keyup',
    showClearButton: true,
    onKeyUp: this.onSearchKeyupHandler.bind(this),
    onValueChanged: this.onSearchValueChanged.bind(this),
    mode: 'search',
    placeholder: 'Search with name',
  };

  refreshButtonOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.onRefresh.bind(this),
  };

  filterSelectBoxOptions: any = {
    items: this.subjectList,
    valueExpr: 'id',
    searchExpr: 'name',
    displayExpr: 'name',
    placeholder: 'Filter with subject',
    searchEnabled: true,
    onValueChanged: this.onFilterChange.bind(this),
  };

  sortSelectBoxOptions: any = {
    items: [
      {
        _id: '-1',
        name: '(NONE)',
      },
      { _id: '0', name: 'asc' },
      { _id: '1', name: 'desc' },
    ],
    valueExpr: 'name',
    placeholder: 'Sort by price',
    displayExpr: 'name',
    onValueChanged: this.onSortValueChanged.bind(this),
  };

  fileData: File = {
    sourceID: '',
    container: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  fileList: Array<File> = [];
  currentDate: Date = new Date();

  constructor(
    private sessionStore: SessionStore,
    private store: StoreService,
    private router: Router
  ) {}

  onOptionChanged(e: any) {
    const editorMode = this.checkEditorMode();
    if (e.fullName === 'currentDate') {
      const currentIndex: number = this.currentIndexFromServer + 1;
      switch (editorMode) {
        case 'NORMAL':
          this.paginatePureData(currentIndex);
          break;
        case 'FILTER':
          this.paginateFilterData(currentIndex);
          break;
        case 'SEARCH':
          this.paginateSearchData(currentIndex);
          break;
        case 'SORT':
          this.paginateSortData(currentIndex);
          break;
        default:
          break;
      }
    }
  }

  onAppointmentClick(e: any) {
    this.store.showNotif(
      `Room: ${e.targetedAppointmentData.maxParticipants}`,
      'custom'
    );
  }

  onAppointmentDblClick(e: any) {
    e.cancel = true;
  }

  selectSession(item: any) {
    this.router.navigate(['course_streaming', JSON.stringify(item)]);
    console.log('SELECTED ID');
    console.log(item);
  }

  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.sessionList.length) {
        switch (editorMode) {
          case 'NORMAL':
            this.paginatePureData(currentIndex + 1);
            break;
          case 'FILTER':
            this.paginateFilterData(currentIndex + 1);
            break;
          case 'SEARCH':
            this.paginateSearchData(currentIndex + 1);
            break;
          case 'SORT':
            this.paginateSortData(currentIndex + 1);
            break;
          default:
            break;
        }
      }
      args.component.release();
    }, 500);
  };
  updateTopContent = (e: any) => {
    this.updateContent(e, 'PullDown');
  };
  updateBottomContent = (e: any) => {
    this.updateContent(e, 'ReachBottom');
  };

  onSearchKeyupHandler(e: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isSearchingByName = true;
      this.isFilteringByCategory = false;
      this.isSortingByPrice = false;
      console.log(this.currentSearchByPropertyValue);
      if (this.currentSearchByPropertyValue !== '') {
        this.sessionStore.initInfiniteSearchByPropertyData(
          this.currentSearchProperty,
          this.currentSearchByPropertyValue,
          1,
          this.pageSize
        );
      } else {
        //return to pure editor mode
        //
        this.onRefresh();
      }
    }, 1250);
  }

  onSearchValueChanged(e: any) {
    this.currentSearchByPropertyValue = e.value;
  }

  onSortValueChanged(e: any) {
    this.isSortingByPrice = true;
    this.isSearchingByName = false;
    this.isFilteringByCategory = false;
    this.currentSortByPropertyValue = e.value;
    if (e.value !== '(NONE)') {
      this.sessionStore.initInfiniteSortByPropertyData(
        this.currentSortProperty,
        e.value,
        1,
        this.pageSize
      );
    } else {
      //return to pure editor mode
      //
      this.onRefresh();
    }
  }

  onFilterChange(e: any) {
    this.isFilteringByCategory = true;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.currentCategoryFilterValue = e.value;
    console.log(e.value);
    if (e.value !== '(NONE)') {
      this.sessionStore.initInfiniteFilterByPropertyData(
        this.currentFilterProperty,
        e.value,
        1,
        this.pageSize
      );
    } else {
      //return to pure editor mode
      //
      this.onRefresh();
    }
  }

  checkEditorMode() {
    if (this.isFilteringByCategory === true) {
      return 'FILTER';
    } else if (this.isSearchingByName === true) {
      return 'SEARCH';
    } else if (this.isSortingByPrice === true) {
      return 'SORT';
    } else {
      return 'NORMAL';
    }
  }

  paginatePureData(index: number) {
    this.sessionStore.loadInfiniteDataAsync(index, this.pageSize);
  }

  paginateFilterData(index: number) {
    this.sessionStore.filterInfiniteSessionByProperty(
      this.currentFilterProperty,
      this.currentCategoryFilterValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.sessionStore.searchInfiniteSessionByProperty(
      this.currentSearchProperty,
      this.currentSearchByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.sessionStore.sortInfiniteSessionByProperty(
      this.currentSortProperty,
      this.currentSortByPropertyValue,
      index,
      this.pageSize
    );
  }

  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.sessionStore.initInfiniteData(1, this.pageSize);
  }

  sourceDataListener() {
    return this.sessionStore.$sessionList.subscribe((data: any) => {
      this.sessionList = data;
    });
  }

  currentPageListener() {
    return this.sessionStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    this.sessionStore.initInfiniteData(1, this.pageSize);
    this.sourceDataListener();
  }

  ngOnInit(): void {
    this.initData();
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
  }
}
