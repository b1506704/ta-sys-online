import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToExcel } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { Course } from 'src/app/shared/models/course';
import { CourseHttpService } from 'src/app/shared/services/course/course-http.service';
import { CourseStore } from 'src/app/shared/services/course/course-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { SubjectStore } from 'src/app/shared/services/subject/subject-store.service';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { convertToPureName } from 'src/app/utils/convertToNonAccent';
import { User } from 'src/app/shared/models/user';
import { Subject } from 'src/app/shared/models/subject';
import { InstructorStore } from 'src/app/shared/services/instructor/instructor-store.service';
import { UserStore } from 'src/app/shared/services/user/user-store.service';

@Component({
  selector: 'app-edit-course-list',
  templateUrl: './edit-course-list.component.html',
  styleUrls: ['./edit-course-list.component.scss'],
})
export class EditCourseListComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  courseList!: Array<Course>;
  subjectList: Array<Subject> = [];

  instructorList: Array<User> = [];
  selectedRows: string[];
  isSelectInfoVisible: boolean = false;
  selectInfoText: string;
  selectedCellRow: Object;
  pageSize: number = 5;
  allowedPageSizes: Array<number | string> = [5, 10, 15];
  scrollingMode: string = 'standard';
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;

  timeout: any;
  currentFilterByPropertyValue: string;
  currentSearchByPropertyValue: string;
  currentSortByPropertyValue: string;
  currentSortProperty: string = 'name';
  currentSearchProperty: string = 'name';
  currentFilterProperty: string = 'subjectId';

  constructor(
    private courseStore: CourseStore,
    private store: StoreService,
    private courseHTTP: CourseHttpService,
    private subjectStore: SubjectStore,
    private instructorStore: InstructorStore,
    private fileStore: FileStore,
    private userStore: UserStore,
    private router: Router
  ) {}

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        template: 'totalCourseCount',
      },
      {
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'refresh',
          hint: 'Fetch data from server',
          onClick: this.onRefresh.bind(this),
        },
      },
      //
      {
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'exportpdf',
          hint: 'Export to PDF',
          onClick: this.exportGridToPdf.bind(this),
        },
      },
      {
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'xlsxfile',
          hint: 'Export to Excel',
          onClick: this.exportDataGridToExcel.bind(this),
        },
      },
      {
        location: 'before',
        widget: 'dxTextBox',
        options: {
          valueChangeEvent: 'keyup',
          showClearButton: true,
          onKeyUp: this.onSearchKeyupHandler.bind(this),
          onValueChanged: this.onSearchValueChanged.bind(this),
          mode: 'search',
          placeholder: 'Search name',
        },
      },
      // {
      //   location: 'center',
      //   locateInMenu: 'auto',
      //   widget: 'dxButton',
      //   options: {
      //     type: 'normal',
      //     icon: 'filter',
      //     disabled: true,
      //     hint: 'Filter with subject',
      //   },
      // },
      // {
      //   location: 'center',
      //   locateInMenu: 'auto',
      //   widget: 'dxSelectBox',
      //   options: {
      //     items: this.subjectList,
      //     valueExpr: 'id',
      //     searchExpr: 'name',
      //     displayExpr: 'name',
      //     placeholder: 'Filter with subject',
      //     searchEnabled: true,
      //     onValueChanged: this.onFilterChange.bind(this),
      //   },
      // },
      {
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'card',
          disabled: true,
          hint: 'Sort by name',
        },
      },
      {
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxSelectBox',
        options: {
          items: [
            {
              id: '-1',
              name: '(NONE)',
            },
            { id: '0', name: 'asc' },
            { id: '1', name: 'desc' },
          ],
          valueExpr: 'name',
          placeholder: 'Sort by name',
          displayExpr: 'name',
          onValueChanged: this.onSortValueChanged.bind(this),
        },
      }
    );
  }

  onSearchKeyupHandler(e: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isSearchingByName = true;
      this.isFilteringByCategory = false;
      this.isSortingByName = false;
      console.log(this.currentSearchByPropertyValue);
      if (this.currentSearchByPropertyValue !== '') {
        this.courseStore.initSearchByPropertyData(
          this.currentSearchProperty,
          this.currentSearchByPropertyValue,
          this.dataGrid.instance.pageIndex() + 1,
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
    this.isSortingByName = true;
    this.isSearchingByName = false;
    this.isFilteringByCategory = false;
    this.currentSortByPropertyValue = e.value;
    if (e.value !== '(NONE)') {
      this.courseStore.initSortByPropertyData(
        this.currentSortProperty,
        e.value,
        this.dataGrid.instance.pageIndex() + 1,
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
    this.isSortingByName = false;
    this.currentFilterByPropertyValue = e.value;
    console.log(e.value);
    if (e.value !== '(NONE)') {
      this.courseStore.initFilterByPropertyData(
        this.currentFilterProperty,
        e.value,
        this.dataGrid.instance.pageIndex() + 1,
        this.pageSize
      );
    } else {
      //
      this.onRefresh();
    }
  }

  checkEditorMode() {
    if (this.isFilteringByCategory === true) {
      return 'FILTER';
    } else if (this.isSearchingByName === true) {
      return 'SEARCH';
    } else if (this.isSortingByName === true) {
      return 'SORT';
    } else {
      return 'NORMAL';
    }
  }

  onOptionChanged(e: any) {
    const editorMode = this.checkEditorMode();
    // event of page index changed
    if (e.fullName === 'paging.pageIndex') {
      const currentIndex: number = e.value + 1;
      console.log(
        `New page index: ${currentIndex}. Total items: ${this.courseList.length}`
      );
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
    if (e.fullName === 'paging.pageSize') {
      this.pageSize = e.value;
      console.log(`Page size changed to ${e.value}`);
      switch (editorMode) {
        case 'NORMAL':
          this.courseStore.loadDataAsync(this.currentIndexFromServer, e.value);
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'FILTER':
          this.courseStore.filterCourseByProperty(
            this.currentFilterProperty,
            this.currentFilterByPropertyValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'SEARCH':
          this.courseStore.searchCourseByProperty(
            this.currentSearchProperty,
            this.currentSearchByPropertyValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'SORT':
          this.courseStore.sortCourseByProperty(
            this.currentSortProperty,
            this.currentSortByPropertyValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        default:
          break;
      }
    }
  }

  paginatePureData(index: number) {
    this.courseStore.loadDataAsync(index, this.pageSize);
  }

  paginateFilterData(index: number) {
    this.courseStore.filterCourseByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.courseStore.searchCourseByProperty(
      this.currentSearchProperty,
      this.currentSearchByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.courseStore.sortCourseByProperty(
      this.currentSortProperty,
      this.currentSortByPropertyValue,
      index,
      this.pageSize
    );
  }

  onEditingStart() {
    this.store.showNotif('Edit mode on', 'custom');
  }

  onInitNewRow() {
    this.store.showNotif(
      'Blank row added, please fill in information',
      'custom'
    );
  }

  onSaved(e: any) {
    if (e.changes.length) {
      switch (e.changes[0].type) {
        case 'insert':
          this.courseStore.uploadCourse(
            e.changes[0].data,
            this.dataGrid.instance.pageIndex() + 1,
            this.pageSize
          );
          const containerName = convertToPureName(e.changes[0].data.name);
          const containerData: any = {
            name: containerName,
          };
          console.log(containerName);
          this.fileStore.uploadContainer(containerData);
          break;
        case 'update':
          console.log(e.changes[0]);
          this.courseStore.updateCourse(
            e.changes[0].data,
            this.dataGrid.instance.pageIndex() + 1,
            this.pageSize
          );
          break;
        case 'remove':
          this.courseStore.deleteCourse(
            [e.changes[0].key],
            this.dataGrid.instance.pageIndex() + 1,
            this.pageSize
          );
          break;
        default:
          break;
      }
    } else {
      this.store.showNotif('No changes dectected', 'custom');
    }
  }

  onEditCanceled() {
    this.store.showNotif('Editing cancelled', 'custom');
  }

  selectionChangedHandler() {
    if (this.selectedRows.length) {
      this.isSelectInfoVisible = true;
      this.selectInfoText = `${this.selectedRows.length} rows selected`;
      this.selectedRows.forEach((row) => {
        console.log(row);
      });
    } else {
      this.isSelectInfoVisible = false;
    }
  }

  changePageSize(pageSize: number) {
    this.dataGrid.instance.pageSize(pageSize);
  }

  goToPage(page: number) {
    this.dataGrid.instance.pageIndex(page);
  }

  deleteSelectedItems() {
    this.store.setIsLoading(true);
    const editorMode = this.checkEditorMode();
    if (this.selectedRows.length) {
      this.courseStore.confirmDialog('').then((result: boolean) => {
        if (result) {
          this.courseHTTP
            .deleteCourse(this.selectedRows)
            .toPromise()
            .then(() => {
              this.store.showNotif(
                `${this.selectedRows.length} items deleted`,
                'custom'
              );
              this.clearSelection();
              switch (editorMode) {
                case 'NORMAL':
                  this.courseStore.initData(
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                case 'FILTER':
                  this.courseStore.initFilterByPropertyData(
                    this.currentFilterProperty,
                    this.currentFilterByPropertyValue,
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                case 'SORT':
                  this.courseStore.initSortByPropertyData(
                    this.currentSortProperty,
                    this.currentSortByPropertyValue,
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                case 'SEARCH':
                  this.courseStore.initSearchByPropertyData(
                    this.currentSearchProperty,
                    this.currentSearchByPropertyValue,
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                default:
                  break;
              }
              this.isSelectInfoVisible = false;
            })
            .then(() => {
              this.store.setIsLoading(false);
            });
        }
      });
    }
  }

  clearSelection() {
    this.selectedRows = [];
  }

  onRefresh() {
    this.isFilteringByCategory = false;
    this.isSearchingByName = false;
    this.isSortingByName = false;
    this.courseStore.initData(
      this.dataGrid.instance.pageIndex() + 1,
      this.pageSize
    );
  }

  exportDataGridToExcel() {
    this.courseStore
      .confirmDialog(
        'This will export all fetched data to excel. Are you sure?'
      )
      .then((result: boolean) => {
        if (result) {
          this.store.setIsLoading(true);
          this.courseHTTP
            .fetchAll()
            .toPromise()
            .then((data: any) => {
              this.courseStore.setExportData(data);
              console.log(data);
              setTimeout(() => {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Course List');
                exportDataGridToExcel({
                  component: this.dataGrid.instance,
                  worksheet: worksheet,
                  autoFilterEnabled: true,
                }).then(() => {
                  workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                      new Blob([buffer], { type: 'application/octet-stream' }),
                      'Course_List.xlsx'
                    );
                    this.store.setIsLoading(false);
                    this.store.showNotif('Export succesully', 'custom');
                  });
                });
              }, 200);
            });
        }
      });
  }

  exportGridToPdf(e: any) {
    this.courseStore
      .confirmDialog('This will export all data to pdf. Are you sure?')
      .then((result: boolean) => {
        if (result) {
          this.store.setIsLoading(true);
          this.courseHTTP
            .fetchAll()
            .toPromise()
            .then((data: any) => {
              this.courseStore.setExportData(data);
              console.log(data);
              setTimeout(() => {
                const doc = new jsPDF();
                exportDataGridToPdf({
                  jsPDFDocument: doc,
                  component: this.dataGrid.instance,
                }).then(() => {
                  doc.save('Course_List.pdf');
                  this.store.setIsLoading(false);
                  this.store.showNotif('Export succesully', 'custom');
                });
              }, 200);
            });
        }
      });
  }

  deleteAll() {
    this.courseStore.deleteAll();
  }

  navigateToStatistics() {
    this.router.navigate(['/statistics']);
  }

  sourceDataListener() {
    return this.courseStore.$courseList.subscribe((data: any) => {
      this.courseList = data;
    });
  }

  instructorDataListener() {
    return this.instructorStore.$instructorList.subscribe((data: any) => {
      this.instructorList = data;
    });
  }

  currentPageListener() {
    return this.courseStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  initData() {
    this.subjectStore.fetchAll().then((data: any) => {
      if (data.length !== 0) {
        console.log('FILTER DATA: ');
        console.log(data);
        this.subjectList = data;
        this.userStore.$roleList.subscribe((data: Array<any>) => {
          const instructorRoleId = data.find(
            (e: any) => e.name === 'Instructor'
          )?.id;
          this.instructorStore
            .initInfiniteData('roleId', instructorRoleId, 1, 100)
            .then(() => {
              this.instructorDataListener();
              setTimeout(() => {
                this.onRefresh();
              }, 150);
            });
        });
      }
    });
  }

  ngOnInit(): void {
    this.sourceDataListener();
    this.currentPageListener();
    this.initData();
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.courseStore.resetState();
  }
}
