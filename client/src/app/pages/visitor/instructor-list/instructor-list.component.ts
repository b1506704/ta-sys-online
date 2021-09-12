import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/shared/models/instructor';
import { InstructorStore } from 'src/app/shared/services/instructor/instructor-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Image } from 'src/app/shared/models/image';
import departmentList from 'src/app/shared/services/instructor/mock-department';
import { ImageStore } from 'src/app/shared/services/image/image-store.service';
import { UserStore } from 'src/app/shared/services/user/user-store.service';

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
  pageSize: number = 10;
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
  currentSortProperty: string = 'displayName';
  currentSearchProperty: string = 'displayName';
  currentFilterProperty: string = 'roleId';

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
    placeholder: 'Sort by name',
    displayExpr: 'name',
    onValueChanged: this.onSortValueChanged.bind(this),
  };

  imageData: Image = {
    sourceID: '',
    container: '',
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
    private imageStore: ImageStore,
    private userStore: UserStore
  ) {}

  selectInstructor(_id: string) {
    this.currentInstructorID = _id;
    console.log('SELECTED ID');
    console.log(_id);
    this.isDetailPopupVisible = true;
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
        this.instructorStore.initInfiniteSearchByPropertyData(
          this.currentFilterProperty,
          this.currentFilterByPropertyValue,
          this.currentSearchProperty,
          this.currentSearchByPropertyValue,
          1,
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
    this.currentSearchByPropertyValue = e.value;
  }

  onSortValueChanged(e: any) {
    this.isSortingByPrice = true;
    this.isSearchingByName = false;
    this.isFilteringByCategory = false;
    this.currentSortByPropertyValue = e.value;
    if (e.value !== '(NONE)') {
      this.instructorStore.initInfiniteSortByPropertyData(
        this.currentFilterProperty,
        this.currentFilterByPropertyValue,
        this.currentSortProperty,
        e.value,
        1,
        this.pageSize
      );
    } else {
      //return to pure editor mode
      this.store.showNotif('SORT MODE OFF', 'custom');
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
    this.instructorStore.loadInfiniteDataAsync(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.instructorStore.searchInfiniteInstructorByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      this.currentSearchProperty,
      this.currentSearchByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.instructorStore.sortInfiniteInstructorByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
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
    this.userStore.getRole().then(() => {
      this.userStore.$roleList.subscribe((data: Array<any>) => {
        this.currentFilterByPropertyValue = data.find(
          (e: any) => e.name === 'Instructor'
        )?.id;
        this.instructorStore.initInfiniteData(
          this.currentFilterProperty,
          this.currentFilterByPropertyValue,
          1,
          this.pageSize
        );
      });
    });
  }

  navigateToCourse() {
    this.router.navigate(['/course_list']);
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

  initData() {
    this.userStore.getRole().then(() => {
      this.userStore.$roleList.subscribe((data: Array<any>) => {
        this.currentFilterByPropertyValue = data.find(
          (e: any) => e.name === 'Instructor'
        )?.id;
        this.instructorStore
          .initInfiniteData(
            this.currentFilterProperty,
            this.currentFilterByPropertyValue,
            1,
            this.pageSize
          )
          .then(() => {
            this.sourceDataListener();
            this.imageDataListener();
          });
      });
    });
  }

  ngOnInit(): void {
    this.currentPageListener();
    this.initData();
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.imageDataListener().unsubscribe();
  }
}
