import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from 'src/app/shared/models/test';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
})
export class TestListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  testList!: Array<Test>;
  currentTestID!: string;
  // item loaded per pull down event
  pageSize: number = 10;
  pullDown = false;
  updateContentTimer: any;
  // standard | virtual | infinite
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;
  isSortingByPrice: boolean;
  isDetailPopupVisible: boolean = false;

  currentCategoryFilterValue: string;
  timeout: any;
  currentSearchByNameValue: string;
  currentSortByPriceValue: string;

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
    items: [],
    valueExpr: 'name',
    displayExpr: 'name',
    placeholder: 'Filter with brand',
    onValueChanged: this.onFilterChange.bind(this),
  };

  sortSelectBoxOptions: any = {
    items: [
      {
        _id: '-1',
        name: '(NONE)',
      },
      { _id: '0', name: 'ASC' },
      { _id: '1', name: 'DESC' },
    ],
    valueExpr: 'name',
    placeholder: 'Sort price',
    displayExpr: 'name',
    onValueChanged: this.onSortValueChanged.bind(this),
  }; 
  currency: string = '$'; 

  constructor(
    private testStore: TestStore,
    private store: StoreService,
    private router: Router
  ) {}

  selectTest(_id: string) {
    this.currentTestID = _id;
    console.log('SELECTED ID');
    console.log(_id);
    // setTimeout(() => {
    this.isDetailPopupVisible = true;
    // }, 1000);
  }

  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.testList.length) {
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
      console.log(this.currentSearchByNameValue);
      if (this.currentSearchByNameValue !== '') {
        this.testStore.initInfiniteSearchByNameData(
          this.currentSearchByNameValue,
          0,
          this.pageSize
        );
      } else {
        //return to pure editor mode
        this.store.showNotif('SEARCH MODE OFF', 'custom');
        this.onRefresh();
      }
    }, 1250);
  }

  onSearchValueChanged(e: any) {
    this.currentSearchByNameValue = e.value;
  }

  onSortValueChanged(e: any) {
    this.isSortingByPrice = true;
    this.isSearchingByName = false;
    this.isFilteringByCategory = false;
    this.currentSortByPriceValue = e.value;
    if (e.value !== '(NONE)') {
      this.testStore.initInfiniteSortByPriceData(e.value, 0, this.pageSize);
    } else {
      //return to pure editor mode
      this.store.showNotif('SORT MODE OFF', 'custom');
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
      this.testStore.initInfiniteFilterByCategoryData(
        e.value,
        0,
        this.pageSize
      );
    } else {
      //return to pure editor mode
      this.store.showNotif('FILTER MODE OFF', 'custom');
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
    this.testStore.loadInfiniteDataAsync(index, this.pageSize);
  }

  paginateFilterData(index: number) {
    this.testStore.filterInfiniteTestByCategory(
      this.currentCategoryFilterValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.testStore.searchInfiniteTestByName(
      this.currentSearchByNameValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.testStore.sortInfiniteTestByPrice(
      this.currentSortByPriceValue,
      index,
      this.pageSize
    );
  }

  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.testStore.initInfiniteData(0, this.pageSize);
  }

  navigateToInstructorSchedule() {
    this.router.navigate(['/instructor_schedule']);
  }

  sourceDataListener() {
    return this.testStore.$testList.subscribe((data: any) => {
      this.testList = data;
    });
  }

  currentPageListener() {
    return this.testStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  ngOnInit(): void {
    this.currentPageListener();
    this.testStore.initInfiniteData(0, this.pageSize).then(() => {
      this.sourceDataListener();
    });
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
  }
}
