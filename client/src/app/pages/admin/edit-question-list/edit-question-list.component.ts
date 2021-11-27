import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToExcel } from 'devextreme/excel_exporter';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';
import { Question } from 'src/app/shared/models/question';
import { QuestionHttpService } from 'src/app/shared/services/question/question-http.service';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { SubjectStore } from 'src/app/shared/services/subject/subject-store.service';

@Component({
  selector: 'app-edit-question-list',
  templateUrl: './edit-question-list.component.html',
  styleUrls: ['./edit-question-list.component.scss'],
})
export class EditQuestionListComponent implements OnInit, OnDestroy {
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;
  questionList!: Array<Question>;
  subjectList: Array<Object> = [];
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
  currentSortProperty: string = 'score';
  currentSearchProperty: string = 'name';
  currentFilterProperty: string = 'subjectId';

  constructor(
    private questionStore: QuestionStore,
    private store: StoreService,
    private questionHTTP: QuestionHttpService,
    private subjectStore: SubjectStore,
    private router: Router
  ) {}

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        template: 'totalQuestionCount',
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
        location: 'center',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          type: 'normal',
          icon: 'card',
          disabled: true,
          hint: 'Sort by score',
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
          placeholder: 'Sort by score',
          displayExpr: 'name',
          onValueChanged: this.onSortValueChanged.bind(this),
        },
      }
    );
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
      this.questionStore.initSortByPropertyData(
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
      this.questionStore.initFilterByPropertyData(
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
        `New page index: ${currentIndex}. Total items: ${this.questionList.length}`
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
          this.questionStore.loadDataAsync(this.currentIndexFromServer, e.value);
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'FILTER':
          this.questionStore.filterQuestionByProperty(
            this.currentFilterProperty,
            this.currentFilterByPropertyValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'SEARCH':
          this.questionStore.searchQuestionByProperty(
            this.currentSearchProperty,
            this.currentSearchByPropertyValue,
            this.currentIndexFromServer,
            e.value
          );
          this.goToPage(this.currentIndexFromServer);
          break;
        case 'SORT':
          this.questionStore.sortQuestionByProperty(
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
    this.questionStore.loadDataAsync(index, this.pageSize);
  }

  paginateFilterData(index: number) {
    this.questionStore.filterQuestionByProperty(
      this.currentFilterProperty,
      this.currentFilterByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSearchData(index: number) {
    this.questionStore.searchQuestionByProperty(
      this.currentSearchProperty,
      this.currentSearchByPropertyValue,
      index,
      this.pageSize
    );
  }

  paginateSortData(index: number) {
    this.questionStore.sortQuestionByProperty(
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
          this.questionStore.uploadQuestion(
            e.changes[0].data,
            this.dataGrid.instance.pageIndex() + 1,
            this.pageSize
          );
          break;
        case 'update':
          console.log(e.changes[0]);
          this.questionStore.updateQuestion(
            e.changes[0].data,
            this.dataGrid.instance.pageIndex() + 1,
            this.pageSize
          );
          break;
        case 'remove':
          this.questionStore.deleteQuestion(
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
      this.questionStore.confirmDialog('').then((result: boolean) => {
        if (result) {
          this.questionHTTP
            .deleteQuestion(this.selectedRows)
            .toPromise()
            .then(() => {
              this.store.showNotif(
                `${this.selectedRows.length} items deleted`,
                'custom'
              );
              this.clearSelection();
              switch (editorMode) {
                case 'NORMAL':
                  this.questionStore.initData(
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                case 'FILTER':
                  this.questionStore.initFilterByPropertyData(
                    this.currentFilterProperty,
                    this.currentFilterByPropertyValue,
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                case 'SORT':
                  this.questionStore.initSortByPropertyData(
                    this.currentSortProperty,
                    this.currentSortByPropertyValue,
                    this.dataGrid.instance.pageIndex() + 1,
                    this.pageSize
                  );
                  break;
                case 'SEARCH':                  
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
    this.questionStore.initData(
      this.dataGrid.instance.pageIndex() + 1,
      this.pageSize
    );
  }


  exportDataGridToExcel() {
    this.questionStore
      .confirmDialog(
        'This will export all fetched data to excel. Are you sure?'
      )
      .then((result: boolean) => {
        if (result) {
          this.store.setIsLoading(true);
          this.questionHTTP
            .fetchAll()
            .toPromise()
            .then((data: any) => {
              this.questionStore.setExportData(data);
              console.log(data);
              setTimeout(() => {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Question List');
                exportDataGridToExcel({
                  component: this.dataGrid.instance,
                  worksheet: worksheet,
                  autoFilterEnabled: true,
                }).then(() => {
                  workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                      new Blob([buffer], { type: 'application/octet-stream' }),
                      'Question_List.xlsx'
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
    this.questionStore
      .confirmDialog('This will export all data to pdf. Are you sure?')
      .then((result: boolean) => {
        if (result) {
          this.store.setIsLoading(true);
          this.questionHTTP
            .fetchAll()
            .toPromise()
            .then((data: any) => {
              this.questionStore.setExportData(data);
              console.log(data);
              setTimeout(() => {
                const doc = new jsPDF();
                exportDataGridToPdf({
                  jsPDFDocument: doc,
                  component: this.dataGrid.instance,
                }).then(() => {
                  doc.save('Question_List.pdf');
                  this.store.setIsLoading(false);
                  this.store.showNotif('Export succesully', 'custom');
                });
              }, 200);
            });
        }
      });
  }

  deleteAll() {
    this.questionStore.deleteAll();
  }

  navigateToStatistics() {
    this.router.navigate(['/statistics']);
  }

  sourceDataListener() {
    return this.questionStore.$questionList.subscribe((data: any) => {
      this.questionList = data;
    });
  }

  currentPageListener() {
    return this.questionStore.$currentPage.subscribe((data: any) => {
      this.currentIndexFromServer = data;
    });
  }

  ngOnInit(): void {
    this.sourceDataListener();
    this.currentPageListener();
    this.subjectStore.fetchAll().then((data: any) => {
      if (data.length !== 0) {
        console.log('FILTER DATA: ');
        console.log(data);
        this.subjectList = data;
        this.subjectList.unshift({ id: '(NONE)', name: '(NONE)' });
        setTimeout(() => {
          this.onRefresh();
        }, 150);
      }
    });
  }

  ngOnDestroy(): void {
    this.sourceDataListener().unsubscribe();
    this.currentPageListener().unsubscribe();
    this.questionStore.resetState();
  }
}
