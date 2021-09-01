import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToExcel } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { Subject } from 'src/app/shared/models/subject';
import { SubjectHttpService } from 'src/app/shared/services/subject/subject-http.service';
import { SubjectStore } from 'src/app/shared/services/subject/subject-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-edit-subject-list',
  templateUrl: './edit-subject-list.component.html',
  styleUrls: ['./edit-subject-list.component.scss'],
})
export class EditSubjectListComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  subjectList!: Array<Subject>;
  discountList: Array<Object> = [
    { _id: '-1', name: '(NONE)' },
    { _id: '0', name: 'YES' },
    { _id: '1', name: 'NO' },
  ];
  selectedRows: string[];
  isSelectInfoVisible: boolean;
  selectInfoText: string;
  selectedCellRow: Object;
  pageSize: number = 5;
  allowedPageSizes: Array<number | string> = [5, 10, 15];
  scrollingMode: string = 'standard';
  // standard | virtual | infinite
  currentIndexFromServer: number;
  isSearchingByName: boolean;
  isFilteringByCategory: boolean;
  isFilteringByPrice: boolean;
  isSortingByName: boolean;

  currentCategoryFilterValue: string;
  timeout: any;
  currentSearchByNameValue: string;
  currentSortByPriceValue: string;

  constructor(
    private subjectStore: SubjectStore,
    private store: StoreService,
    private subjectHTTP: SubjectHttpService,
    private router: Router
  ) {}

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        template: 'totalSubjectCount',
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
      {
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'danger',
          icon: 'trash',
          hint: 'Delete all items',
          onClick: this.deleteAll.bind(this),
        },
      },
      {
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'danger',
          icon: 'parentfolder',
          hint: 'Generate random 100+ items',
          onClick: this.onAddRandom.bind(this),
        },
      },
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
          placeholder: 'Search id',
        },
      },
      {
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'filter',
          disabled: true,
          hint: 'Filter with health insurance',
        },
      },
      {
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxSelectBox',
        options: {
          items: this.discountList,
          valueExpr: 'name',
          // searchExpr: 'name',
          displayExpr: 'name',
          placeholder: 'Filter with health insurance',
          // searchEnabled: true,
          onValueChanged: this.onFilterChange.bind(this),
        },
      },
      {
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'card',
          disabled: true,
          hint: 'Sort by total cost',
        },
      },
      {
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxSelectBox',
        options: {
          items: [
            {
              _id: '-1',
              name: '(NONE)',
            },
            { _id: '0', name: 'ASC' },
            { _id: '1', name: 'DESC' },
          ],
          valueExpr: 'name',
          placeholder: 'Sort by total cost',
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
      console.log(this.currentSearchByNameValue);
      if (this.currentSearchByNameValue !== '') {
        this.subjectStore.initSearchByNameData(
          this.currentSearchByNameValue,
          this.dataGrid.instance.pageIndex(),
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
    this.isSortingByName = true;
    this.isSearchingByName = false;
    this.isFilteringByCategory = false;
    this.currentSortByPriceValue = e.value;
    if (e.value !== '(NONE)') {
      this.subjectStore.initSortByPriceData(
        e.value,
        this.dataGrid.instance.pageIndex(),
        this.pageSize
      );
    } else {
      //return to pure editor mode
      this.store.showNotif('SORT MODE OFF', 'custom');
      this.onRefresh();
    }
  }

  onFilterChange(e: any) {
    this.isFilteringByCategory = true;
    this.isSearchingByName = false;
    this.isSortingByName = false;
    this.currentCategoryFilterValue = e.value;
    console.log(e.value);
    if (e.value !== '(NONE)') {
      this.subjectStore.initFilterByCategoryData(
        e.value,
        this.dataGrid.instance.pageIndex(),
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
        `New page index: ${currentIndex}. Total items: ${this.subjectList.length}`
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
    // todo: handle virtual scrolling when pagesize = 'all'
    //
    // event of page size changed by user's click
    if (e.fullName === 'paging.pageSize') {
      this.pageSize = e.value;
      console.log(`Page size changed to ${e.value}`);
      switch (editorMode) {
        case 'NORMAL':
          this.subjectStore.loadDataAsync(this.currentIndexFromServer, e.value);
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'FILTER':
          this.subjectStore.filterSubjectByCategory(
            this.currentCategoryFilterValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'SEARCH':
          this.subjectStore.searchSubjectByName(
            this.currentSearchByNameValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'SORT':
          this.subjectStore.sortSubjectByPrice(
            this.currentSortByPriceValue,
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
    this.subjectStore.loadDataAsync(index, this.pageSize);
    // if (index === 0) {
    //   // this.subjectStore.loadDataAsync(index + 1, this.pageSize);
    // } else {
    //   // this.subjectStore.loadDataAsync(index, this.pageSize);
    //   // this.subjectStore.loadDataAsync(index + 1, this.pageSize);
    //   // this.subjectStore.loadDataAsync(index - 1, this.pageSize);
    // }
  }

  paginateFilterData(index: number) {
    if (index === 0) {
      this.subjectStore.filterSubjectByCategory(
        this.currentCategoryFilterValue,
        index,
        this.pageSize
      );
      this.subjectStore.filterSubjectByCategory(
        this.currentCategoryFilterValue,
        index + 1,
        this.pageSize
      );
    } else {
      this.subjectStore.filterSubjectByCategory(
        this.currentCategoryFilterValue,
        index,
        this.pageSize
      );
      this.subjectStore.filterSubjectByCategory(
        this.currentCategoryFilterValue,
        index + 1,
        this.pageSize
      );
      this.subjectStore.filterSubjectByCategory(
        this.currentCategoryFilterValue,
        index - 1,
        this.pageSize
      );
    }
  }

  paginateSearchData(index: number) {
    if (index === 0) {
      this.subjectStore.searchSubjectByName(
        this.currentSearchByNameValue,
        index,
        this.pageSize
      );
      this.subjectStore.searchSubjectByName(
        this.currentSearchByNameValue,
        index + 1,
        this.pageSize
      );
    } else {
      this.subjectStore.searchSubjectByName(
        this.currentSearchByNameValue,
        index,
        this.pageSize
      );
      this.subjectStore.searchSubjectByName(
        this.currentSearchByNameValue,
        index + 1,
        this.pageSize
      );
      this.subjectStore.searchSubjectByName(
        this.currentSearchByNameValue,
        index - 1,
        this.pageSize
      );
    }
  }

  paginateSortData(index: number) {
    if (index === 0) {
      this.subjectStore.sortSubjectByPrice(
        this.currentSortByPriceValue,
        index,
        this.pageSize
      );
      this.subjectStore.sortSubjectByPrice(
        this.currentSortByPriceValue,
        index + 1,
        this.pageSize
      );
    } else {
      this.subjectStore.sortSubjectByPrice(
        this.currentSortByPriceValue,
        index,
        this.pageSize
      );
      this.subjectStore.sortSubjectByPrice(
        this.currentSortByPriceValue,
        index + 1,
        this.pageSize
      );
      this.subjectStore.sortSubjectByPrice(
        this.currentSortByPriceValue,
        index - 1,
        this.pageSize
      );
    }
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
          this.subjectStore.uploadSubject(
            e.changes[0].data,
            this.dataGrid.instance.pageIndex(),
            this.pageSize
          );
          break;
        case 'update':
          console.log(e.changes[0]);
          this.subjectStore.updateSubject(
            e.changes[0].data,
            e.changes[0].key,
            this.dataGrid.instance.pageIndex(),
            this.pageSize
          );
          break;
        case 'remove':
          this.subjectStore.deleteSubject(
            e.changes[0].key,
            this.dataGrid.instance.pageIndex(),
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
      this.subjectStore.confirmDialog('').then((result: boolean) => {
        if (result) {
          this.subjectHTTP
            .deleteSelectedSubjects(this.selectedRows)
            .toPromise()
            .then(() => {
              this.store.showNotif(
                `${this.selectedRows.length} items deleted`,
                'custom'
              );
              this.clearSelection();
              switch (editorMode) {
                case 'NORMAL':
                  this.subjectStore.initData(
                    this.dataGrid.instance.pageIndex(),
                    this.pageSize
                  );
                  break;
                case 'FILTER':
                  this.subjectStore.initFilterByCategoryData(
                    this.currentCategoryFilterValue,
                    this.dataGrid.instance.pageIndex(),
                    this.pageSize
                  );
                  break;
                case 'SORT':
                  this.subjectStore.initSortByPriceData(
                    this.currentSortByPriceValue,
                    this.dataGrid.instance.pageIndex(),
                    this.pageSize
                  );
                  break;
                case 'SEARCH':
                  this.subjectStore.initSearchByNameData(
                    this.currentSearchByNameValue,
                    this.dataGrid.instance.pageIndex(),
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
    this.subjectStore.initData(
      this.dataGrid.instance.pageIndex() + 1,
      this.pageSize
    );
  }

  onAddRandom() {
    this.subjectStore
      .confirmDialog(
        'This will generate random 100+ items in database. Are you sure'
      )
      .then((result: boolean) => {
        if (result) {
          this.isFilteringByCategory = false;
          this.store.setIsLoading(true);
          this.subjectHTTP
            .generateRandomSubject()
            .toPromise()
            .then(() => {
              this.subjectStore.initData(
                this.dataGrid.instance.pageIndex(),
                this.pageSize
              );
            })
            .then(() => {
              this.store.setIsLoading(false);
              this.store.showNotif('Generated 100+ random items', 'custom');
            });
        }
      });
  }

  exportDataGridToExcel() {
    this.subjectStore
      .confirmDialog(
        'This will export all fetched data to excel. Are you sure?'
      )
      .then((result: boolean) => {
        if (result) {
          this.store.setIsLoading(true);
          this.subjectHTTP
            .fetchAll()
            .toPromise()
            .then((data: any) => {
              this.subjectStore.setExportData(data);
              console.log(data);
              setTimeout(() => {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Subject List');
                exportDataGridToExcel({
                  component: this.dataGrid.instance,
                  worksheet: worksheet,
                  autoFilterEnabled: true,
                }).then(() => {
                  workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                      new Blob([buffer], { type: 'application/octet-stream' }),
                      'Subject_List.xlsx'
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
    this.subjectStore
      .confirmDialog('This will export all data to pdf. Are you sure?')
      .then((result: boolean) => {
        if (result) {
          this.store.setIsLoading(true);
          this.subjectHTTP
            .fetchAll()
            .toPromise()
            .then((data: any) => {
              this.subjectStore.setExportData(data);
              console.log(data);
              setTimeout(() => {
                const doc = new jsPDF();
                exportDataGridToPdf({
                  jsPDFDocument: doc,
                  component: this.dataGrid.instance,
                }).then(() => {
                  doc.save('Subject_List.pdf');
                  this.store.setIsLoading(false);
                  this.store.showNotif('Export succesully', 'custom');
                });
              }, 200);
            });
        }
      });
  }

  deleteAll() {
    this.subjectStore.deleteAllSubjects();
  }

  navigateToStatistics() {
    this.router.navigate(['/statistics']);
  }

  sourceDataListener() {
    return this.subjectStore.$subjectList.subscribe((data: any) => {
      this.subjectList = data;
    });
  }

  currentPageListener() {
    return this.subjectStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  ngOnInit(): void {
    this.sourceDataListener();
    this.currentPageListener();
    setTimeout(() => {
      this.onRefresh();
    }, 150);
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.onRefresh();
  }
}