import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/shared/models/instructor';
import { InstructorStore } from 'src/app/shared/services/instructor/instructor-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Image } from 'src/app/shared/models/image';
import departmentList from 'src/app/shared/services/instructor/mock-department';
import { ImageStore } from 'src/app/shared/services/image/image-store.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss'],
})
export class InstructorListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  instructorList!: Array<Instructor>;
  departmentList: Array<Object> = departmentList();
  currentInstructorID!: string;
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
    items: this.departmentList,
    valueExpr: 'name',
    displayExpr: 'name',
    placeholder: 'Filter with department',
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
    placeholder: 'Sort by age',
    displayExpr: 'name',
    onValueChanged: this.onSortValueChanged.bind(this),
  };

  imageData: Image = {
    sourceID: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  imageList: Array<Image> = [];

  constructor(
    private instructorStore: InstructorStore,
    private store: StoreService,
    private router: Router,
    private imageStore: ImageStore
  ) {}

  selectInstructor(_id: string) {
    this.currentInstructorID = _id;
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
      if (this.instructorList.length) {
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
        this.instructorStore.initInfiniteSearchByNameData(
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
      this.instructorStore.initInfiniteSortByPriceData(e.value, 0, this.pageSize);
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
      this.instructorStore.initInfiniteFilterByCategoryData(
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
    this.instructorStore.loadInfiniteDataAsync(index, this.pageSize);
  }

  paginateFilterData(index: number) {
    this.instructorStore.filterInfiniteInstructorByCategory(
      this.currentCategoryFilterValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.instructorStore.searchInfiniteInstructorByName(
      this.currentSearchByNameValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.instructorStore.sortInfiniteInstructorByPrice(
      this.currentSortByPriceValue,
      index,
      this.pageSize
    );
  }

  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.instructorStore.initInfiniteData(0, this.pageSize);
  }

  navigateToTest() {
    this.router.navigate(['/test_list']);
  }

  sourceDataListener() {
    return this.instructorStore.$instructorList.subscribe((data: any) => {
      this.instructorList = data;
    });
  }

  mapImageListToUrl(_id: string) {
    if (this.imageList.length !== 0) {
      const fetchedImage = this.imageList.find(
        (e: any) => e.sourceID === _id
      )?.url;
      if (fetchedImage) {
        return fetchedImage;
      } else {
        return this.imageData.url;
      }
    } 
    return this.imageData.url;
  }

  imageDataListener() {
    return this.imageStore.$imageList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.imageList = data;
        console.log('IMAGE LIST OF DOCTOR');
        console.log(this.imageList);
      }
    });
  }

  currentPageListener() {
    return this.instructorStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  ngOnInit(): void {
    this.currentPageListener();
    this.instructorStore.initInfiniteData(0, this.pageSize).then(() => {
      this.sourceDataListener();
      this.imageDataListener();
    });
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.imageDataListener().unsubscribe();
  }
}