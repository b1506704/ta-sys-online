import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { CommentHttpService } from './comment-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { FileStore } from '../file/file-store.service';

interface CommentState {
  commentList: Array<Comment>;
  exportData: Array<Comment>;
  selectedComment: Object;
  commentInstance: Comment;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: CommentState = {
  commentList: [],
  selectedComment: {},
  commentInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class CommentStore extends StateService<CommentState> {
  constructor(
    private commentService: CommentHttpService,
    private store: StoreService,
    private fileStore: FileStore
  ) {
    super(initialState);
  }
  /**
   * This is a function which fills the items received from pagination in a specific store's state variable.
   * 
   * @author Le Bao Anh
   * @version 1.0.0
   * @param {number} startIndex - The current page of ss pagination
   * @param {number} endIndex - The page size of ss pagination
   * @param {Array<Object>} sourceArray - The source array/state in a specific store service
   * @param {Array<Object>} addedArray - The array of items received from ss pagination
   * @return {Array<Object>} Return an array with filled items from ss pagination
   * @example
   * this.setState({
            sourceList: this.fillEmpty(
              page - 1,
              size,
              this.state.sourceList,
              arrayItemFromServer
            ),
          });
   */
  fillEmpty(
    startIndex: number,
    endIndex: number,
    sourceArray: Array<Comment>,
    addedArray: Array<Comment>
  ): Array<Comment> {
    let result: Array<Comment> = sourceArray;
    console.log('FILL INDEX');
    let fillIndex = startIndex * endIndex;
    console.log(fillIndex);
    for (var j = 0; j < addedArray.length; j++) {
      result[fillIndex] = addedArray[j];
      fillIndex++;
    }
    // endIndex = pageSize
    // pageSize = 5
    // 0 => 0,1,2,3,4,
    // 1 -> 5,6,7,8,9
    // 2 -> 10,11,12,13,14
    // 17 -> 85,86,87,88,89
    console.log('Filled array result');
    console.log(result);
    return result;
  }

  fetchMediaBySourceID(sourceIDs: Array<string>) {
    const sourceIds = sourceIDs.map((e: any) => e.id);
    this.fileStore.getFiles(sourceIds);
  }

  initInfiniteData(page: number, size: number) {
    return this.commentService
      .fetchComment(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infite list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadInfiniteDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.commentService.fetchComment(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          commentList: this.state.commentList.concat(data.data),
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Infinite list');
        console.log(this.state.commentList);
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

  loadDataAsyncByLearnerID(page: number, size: number, learnerID: string) {
    this.setIsLoading(true);
    this.commentService
      .fetchCommentByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            commentList: this.fillEmpty(
              page - 1,
              size,
              this.state.commentList,
              data.data
            ),
          });
          console.log('Pure list');
          console.log(this.state.commentList);
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

  initInfiniteDataByLearnerID(page: number, size: number, learnerID: string) {
    return this.commentService
      .fetchCommentByLearnerID(page, size, learnerID)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infite list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadInfiniteDataAsyncByLearnerID(
    page: number,
    size: number,
    learnerID: string
  ) {
    this.setIsLoading(true);
    this.commentService
      .fetchCommentByLearnerID(page, size, learnerID)
      .subscribe({
        next: (data: any) => {
          this.setState({
            commentList: this.state.commentList.concat(data.data),
          });
          console.log('Infinite list');
          console.log(this.state.commentList);
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

  initData(page: number, size: number) {
    this.commentService
      .fetchComment(page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: new Array<Comment>(data.totalRecords),
        });
        console.log('Current flag: pure list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.loadDataAsync(page, size);
      });
  }

  initFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.commentService
      .filterCommentByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: new Array<Comment>(data.totalRecords),
        });
        console.log('Current flag: filtered list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.filterCommentByProperty(property, value, page, size);
      });
  }

  initInfiniteFilterByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Filtered Mode On', 'custom');
    this.commentService
      .filterCommentByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: infinite filtered list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.commentService
      .searchCommentByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: new Array<Comment>(data.totalRecords),
        });
        console.log('Current flag: searched list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.searchCommentByProperty(property, value, page, size);
      });
  }

  initInfiniteSearchByPropertyData(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Searched Mode On', 'custom');
    this.commentService
      .searchCommentByProperty(property, value, page, size)
      .toPromise()
      .then((data: any) => {
        if (data.totalRecords !== 0) {
          this.setState({
            commentList: data.data,
          });
          this.fetchMediaBySourceID(data.data);
        } else {
          this.store.showNotif('No result found!', 'custom');
        }
        console.log('Current flag: infitite searched list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  initSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.commentService
      .sortCommentByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: new Array<Comment>(data.totalRecords),
        });
        console.log('Current flag: sort list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      })
      .then(() => {
        this.sortCommentByProperty(value, order, page, size);
      });
  }

  initInfiniteSortByPropertyData(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.store.showNotif('Sort Mode On', 'custom');
    this.commentService
      .sortCommentByProperty(value, order, page, size)
      .toPromise()
      .then((data: any) => {
        this.setState({
          commentList: data.data,
        });
        this.fetchMediaBySourceID(data.data);
        console.log('Current flag: sort list');
        console.log(this.state.commentList);
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
      });
  }

  loadDataAsync(page: number, size: number) {
    this.setIsLoading(true);
    this.commentService.fetchComment(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          commentList: this.fillEmpty(
            page - 1,
            size,
            this.state.commentList,
            data.data
          ),
        });
        console.log('Pure list');
        console.log(this.state.commentList);
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

  refresh(page: number, size: number) {
    this.setIsLoading(true);
    this.commentService.fetchComment(page, size).subscribe({
      next: (data: any) => {
        this.setState({
          commentList: this.fillEmpty(
            page - 1,
            size,
            this.state.commentList,
            data.data
          ),
        });
        this.setState({ totalItems: data.totalRecords });
        this.setState({ totalPages: data.totalPages });
        this.setState({ currentPage: data.pageNumber });
        console.log('Pure list');
        console.log(this.state.commentList);
        console.log('Server response');
        console.log(data);
        this.store.showNotif('Refresh successfully', 'custom');
        this.setIsLoading(false);
      },
      error: (data: any) => {
        this.setIsLoading(false);
        this.store.showNotif(data.error.responseMessage, 'error');
        console.log(data);
      },
    });
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $commentList: Observable<Array<Comment>> = this.select(
    (state) => state.commentList
  );

  $exportData: Observable<Array<Comment>> = this.select(
    (state) => state.exportData
  );

  $totalPages: Observable<Number> = this.select((state) => state.totalPages);

  $totalItems: Observable<Number> = this.select((state) => state.totalItems);

  $currentPage: Observable<Number> = this.select((state) => state.currentPage);

  $selectedComment: Observable<Object> = this.select(
    (state) => state.selectedComment
  );

  $commentInstance: Observable<Comment> = this.select(
    (state) => state.commentInstance
  );

  uploadComment(comment: Comment, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.commentService.uploadComment(comment).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems + 1);
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  updateComment(comment: Comment, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.commentService.updateComment(comment).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  deleteSelectedComments(
    selectedComments: Array<string>,
    page: number,
    size: number
  ) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.commentService.deleteComment(selectedComments).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.loadDataAsync(page, size);
            console.log(this.state.commentList);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  deleteAll() {
    this.confirmDialog('Delete all items?').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.commentService.deleteAll().subscribe({
          next: (data: any) => {
            this.resetState();
            console.log(data);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  deleteComment(id: Array<string>, page: number, size: number) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.commentService.deleteComment(id).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            this.setTotalItems(this.state.totalItems - 1);
            console.log(data);
            this.loadDataAsync(page, size);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  selectComment(_comment: Comment) {
    this.setState({ selectedComment: _comment });
  }

  setTotalPages(_totalPages: number) {
    this.setState({ totalPages: _totalPages });
  }

  setTotalItems(_totalItems: number) {
    this.setState({ totalItems: _totalItems });
  }

  setCurrentPage(_currentPage: number) {
    this.setState({ currentPage: _currentPage });
  }

  filterCommentByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.commentService
      .filterCommentByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              commentList: this.fillEmpty(
                page - 1,
                size,
                this.state.commentList,
                data.data
              ),
            });
            console.log('Filtered list');
            console.log(this.state.commentList);
            console.log('Server response');
            console.log(data);
            this.setState({ totalItems: data.totalRecords });
            this.setState({ totalPages: data.totalPages });
            this.setState({ currentPage: data.pageNumber });
          }
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  filterInfiniteCommentByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.commentService
      .filterCommentByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              commentList: this.state.commentList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Filtered list');
          console.log(this.state.commentList);
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

  searchCommentByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.commentService
      .searchCommentByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            this.setState({
              commentList: this.fillEmpty(
                page - 1,
                size,
                this.state.commentList,
                data.data
              ),
            });
          } else {
            this.store.showNotif('No result found!', 'custom');
          }
          console.log('Searched list');
          console.log(this.state.commentList);
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

  searchInfiniteCommentByProperty(
    property: string,
    value: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.commentService
      .searchCommentByProperty(property, value, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.totalRecords !== 0) {
            if (data.data.length) {
              this.setState({
                commentList: this.state.commentList.concat(data.data),
              });
              this.fetchMediaBySourceID(data.data);
            }
          } else {
            this.store.showNotif('No result found!', 'custome');
          }
          console.log('Infite searched list');
          console.log(this.state.commentList);
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

  sortCommentByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.commentService
      .sortCommentByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          this.setState({ responseMsg: data });
          this.setState({
            commentList: this.fillEmpty(
              page - 1,
              size,
              this.state.commentList,
              data.data
            ),
          });
          this.setState({ totalItems: data.totalRecords });
          this.setState({ totalPages: data.totalPages });
          this.setState({ currentPage: data.pageNumber });
          console.log('Sorted list');
          console.log(this.state.commentList);
          console.log('Server response');
          console.log(data);
          this.setIsLoading(false);
        },
        error: (data: any) => {
          this.setIsLoading(false);
          this.store.showNotif(data.error.responseMessage, 'error');
          console.log(data);
        },
      });
  }

  sortInfiniteCommentByProperty(
    value: string,
    order: string,
    page: number,
    size: number
  ) {
    this.setIsLoading(true);
    this.commentService
      .sortCommentByProperty(value, order, page, size)
      .subscribe({
        next: (data: any) => {
          if (data.data.length) {
            this.setState({
              commentList: this.state.commentList.concat(data.data),
            });
            this.fetchMediaBySourceID(data.data);
          }
          console.log('Infite sorted list');
          console.log(this.state.commentList);
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

  getComment(id: string) {
    this.setIsLoading(true);
    return this.commentService
      .getComment(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ commentInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }

  setExportData(array: Array<Comment>) {
    this.setState({ commentList: array });
  }

  resetState() {
    this.setState(initialState);
  }
}
