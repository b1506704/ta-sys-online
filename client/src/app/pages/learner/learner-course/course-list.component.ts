import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { CourseStore } from 'src/app/shared/services/course/course-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { DxScrollViewComponent } from 'devextreme-angular';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { Subject } from 'src/app/shared/models/subject';
import { SubjectHttpService } from 'src/app/shared/services/subject/subject-http.service';
import { UserStore } from 'src/app/shared/services/user/user-store.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;
  courseList!: Array<Course>;
  subjectList: Array<Subject> = [];
  currentCourseID!: string;
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
  currentSortProperty: string = 'cost';
  currentSearchProperty: string = 'name';
  currentFilterProperty: string = 'instructorId';
  userId: string;

  refreshButtonOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.onRefresh.bind(this),
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

  constructor(
    private courseStore: CourseStore,
    private subjectHTTP: SubjectHttpService,
    private store: StoreService,
    private router: Router,
    private fileStore: FileStore
  ) {}

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentFilterByPropertyValue = data;
        this.userId = data;
      }
    });
  }

  selectCourse(course: Course) {
    this.store.setCurrentCourse(course);
    this.router.navigate(['learner_classroom']);
    console.log('SELECTED COURSE');
    console.log(course);
  }

  updateContent = (args: any, eventName: any) => {
    const editorMode = this.checkEditorMode();
    const currentIndex = this.currentIndexFromServer;
    if (this.updateContentTimer) clearTimeout(this.updateContentTimer);
    this.updateContentTimer = setTimeout(() => {
      if (this.courseList.length) {
        switch (editorMode) {
          case 'NORMAL':
            this.paginatePureData(currentIndex + 1);
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

  onFilterChange(e: any) {
    this.isFilteringByCategory = true;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.currentCategoryFilterValue = e.value;
    console.log(e.value);
    if (e.value !== '(NONE)') {
      this.courseStore.initInfiniteFilterByPropertyData(
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
    this.courseStore.loadInfiniteUserCourseDataAsync(
      this.userId,
      index,
      this.pageSize
    );
  }

  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByPrice = false;
    this.courseStore.initInfiniteUserCourseData(this.userId, 1, this.pageSize);
  }

  navigateToScheduleList() {
    this.router.navigate(['/schedule_list']);
  }

  sourceDataListener() {
    return this.courseStore.$courseLearnerList.subscribe((data: any) => {
      this.courseList = data;
    });
  }

  mapFileListToUrl(_id: string) {
    if (this.fileList.length !== 0) {
      const fetchedFile = this.fileList.find(
        (e: any) => e.sourceID === _id
      )?.url;
      if (fetchedFile) {
        return fetchedFile;
      } else {
        return this.fileData.url;
      }
    }
    return this.fileData.url;
  }

  fileDataListener() {
    return this.fileStore.$fileList.subscribe((data: any) => {
      if (data.length !== 0) {
        this.fileList = data;
        //
        //
      }
    });
  }

  currentPageListener() {
    return this.courseStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  scrollTop() {
    this.scrollView.instance.scrollTo({ top: 0, left: 0 });
  }

  initData() {
    this.courseStore.initInfiniteUserCourseData(this.userId, 1, this.pageSize);
    this.sourceDataListener();
    this.fileDataListener();
  }

  filterDataListener() {
    return this.subjectHTTP.fetchAll().subscribe((data: any) => {
      this.subjectList = data;
      console.log(this.subjectList);
    });
  }

  ngOnInit(): void {
    this.getUserID();
    this.filterDataListener();
    this.initData();
    this.currentPageListener();
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.fileDataListener().unsubscribe();
  }
}
