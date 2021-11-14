import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { StoreService } from 'src/app/shared/services/store.service';
import { PostHttpService } from 'src/app/shared/services/post/post-http.service';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { Container } from 'src/app/shared/models/container';
import { UserStore } from 'src/app/shared/services/user/user-store.service';
import { UserHttpService } from 'src/app/shared/services/user/user-http.service';
import { CourseHttpService } from 'src/app/shared/services/course/course-http.service';
import { SubjectHttpService } from 'src/app/shared/services/subject/subject-http.service';
import { LessonHttpService } from 'src/app/shared/services/lesson/lesson-http.service';
import { TestHttpService } from 'src/app/shared/services/test/test-http.service';
import { QuestionHttpService } from 'src/app/shared/services/question/question-http.service';
@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.scss'],
})
export class UpdateFileComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxFormComponent, { static: false }) dxForm: DxFormComponent;
  @Input() selectedItem!: any;
  submitButtonOptions: any = {
    text: 'Submit',
    icon: 'save',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetButtonOptions: any = {
    text: 'Reset',
    icon: 'refresh',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: this.resetValues.bind(this),
  };
  tempUrl: string = '';
  fileData: any = {
    id: '',
    container: '',
    category: '',
    url: '',
    fileName: '',
    sourceID: '',
    title: '',
  };
  containerList: Array<Container> = [];
  categoryList: Array<any> = [
    {
      name: 'post',
    },
    {
      name: 'learner',
    },
    {
      name: 'instructor',
    },
    {
      name: 'test',
    },
    {
      name: 'lesson',
    },
    {
      name: 'course',
    },
    {
      name: 'question',
    },
    {
      name: 'subject',
    },
  ];
  isUploading!: boolean;
  searchPlaceholder!: string;
  searchCategory!: string;
  searchValue!: string;
  selectedData: any;
  searchData: Array<any> = [];
  valueExpr!: string;
  pageSize: number = 100;
  timeout: any;
  isOpenSuggestionTimeout: any;
  isOpenSuggestion!: boolean;
  instructorRoleId!: string;
  learnerRoleId!: string;

  constructor(
    private fileStore: FileStore,
    private store: StoreService,
    private userStore: UserStore,
    private userService: UserHttpService,
    private postService: PostHttpService,
    private courseService: CourseHttpService,
    private subjectService: SubjectHttpService,
    private lessonService: LessonHttpService,
    private testService: TestHttpService,
    private questionService: QuestionHttpService
  ) {}

  onCategoryValueChanged(e: any) {
    this.fileData.category = e.value;
    this.searchValue = '';
    switch (e.value) {
      case 'learner':
      case 'instructor':
        this.valueExpr = 'displayName';
        this.searchCategory = 'Display Name';
        this.searchPlaceholder = 'Search display name';
        break;
      case 'post':
        this.valueExpr = 'title';
        this.searchCategory = 'Post Title';
        this.searchPlaceholder = 'Search post title';
        break;
      case 'course':
      case 'test':
      case 'subject':
      case 'lesson':
        this.valueExpr = 'name';
        this.searchCategory = 'Name';
        this.searchPlaceholder = 'Search name';
        break;
      case 'question':
        this.valueExpr = 'content';
        this.searchCategory = 'Content';
        this.searchPlaceholder = 'Search content';
        break;
      default:
        break;
    }
  }

  resetValues() {
    this.tempUrl = '';
    this.fileData = {
      id: '',
      container: '',
      category: '',
      url: '',
      fileName: '',
      sourceID: '',
      title: '',
    };
  }

  isUploadingListener() {
    return this.fileStore.$isUpdatingFile.subscribe((data: boolean) => {
      this.isUploading = data;
    });
  }

  containerDataListener() {
    return this.fileStore.$containerList.subscribe((data: any) => {
      if (data?.length !== 0) {
        this.containerList = data;
      }
    });
  }

  onItemClick(e: any) {
    this.selectedData = e.itemData;
    console.log('SELECTED DATA');
    console.log(this.selectedData);
    this.fileData.sourceID = e.itemData?.id;

    switch (this.fileData?.category) {
      case 'instructor':
      case 'learner':
        this.fileData.title = e.itemData.displayName;
        break;
      case 'post':
        this.fileData.title = e.itemData.title;
        break;
      case 'course':
      case 'test':
      case 'subject':
      case 'lesson':
        this.fileData.title = e.itemData.name;
        break;
      case 'question':
        this.fileData.title = e.itemData.content;
        break;
      default:
        break;
    }
  }

  onSearchKeyUpHandler(e: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.isUploading = true;
      switch (this.fileData?.category) {
        case 'instructor':
          this.userService
            .filterSearchUserByProperty(
              'roleId',
              this.instructorRoleId,
              'displayName',
              this.searchValue,
              1,
              this.pageSize
            )
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'learner':
          this.userService
            .filterSearchUserByProperty(
              'roleId',
              this.learnerRoleId,
              'displayName',
              this.searchValue,
              1,
              this.pageSize
            )
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'post':
          this.postService
            .searchPostByProperty('title', this.searchValue, 0, this.pageSize)
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'course':
          this.courseService
            .searchCourseByProperty('name', this.searchValue, 0, this.pageSize)
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'subject':
          this.subjectService
            .searchSubjectByProperty('name', this.searchValue, 0, this.pageSize)
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'test':
          this.testService
            .searchTestByProperty('name', this.searchValue, 0, this.pageSize)
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'lesson':
          this.lessonService
            .searchLessonByProperty('name', this.searchValue, 0, this.pageSize)
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        case 'question':
          this.questionService
            .searchQuestionByProperty(
              'content',
              this.searchValue,
              0,
              this.pageSize
            )
            .subscribe((data: any) => {
              this.searchData = data.data;
              if (data.data === null) {
                this.store.showNotif('There is no matched item!', 'custom');
              } else {
                clearTimeout(this.isOpenSuggestionTimeout);
                this.isOpenSuggestion = false;
                this.isOpenSuggestionTimeout = setTimeout(() => {
                  this.isOpenSuggestion = true;
                }, 500);
              }
              console.log('SEARCH DATA');
              console.log(this.searchData);
              this.isUploading = false;
            });
          break;
        default:
          break;
      }
    }, 1250);
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.fileStore.updateFile(
      this.fileData.id,
      this.fileData.sourceID,
      this.fileData.title
    );
    this.resetValues();
  };

  ngOnInit(): void {
    this.getRoleIdList();
    this.containerDataListener();
    this.isUploadingListener();
  }

  renderSelectedFile() {
    if (this.selectedItem) {
      console.log('SELECTED IMAGE');
      console.log(this.selectedItem);
      this.fileData.id = this.selectedItem.__KEY__;
      this.fileData.fileName = this.selectedItem.name;
      this.fileData.title = this.selectedItem.title;
      this.fileData.category = this.selectedItem.category;
      this.fileData.container = this.selectedItem.container;
      this.fileData.url = this.selectedItem.thumbnail;
      this.fileData.sourceID = this.selectedItem.sourceID;
    }
    this.searchValue = '';
    this.searchPlaceholder = '';
    this.searchCategory = '';
  }

  getRoleIdList() {
    this.userStore.getRole().then(() => {
      this.userStore.$roleList.subscribe((data: Array<any>) => {
        this.instructorRoleId = data.find(
          (e: any) => e.name === 'Instructor'
        )?.id;
        this.learnerRoleId = data.find((e: any) => e.name === 'Learner')?.id;
      });
    });
  }

  ngOnChanges(): void {
    this.renderSelectedFile();
  }

  ngOnDestroy(): void {
    this.isUploadingListener().unsubscribe();
    this.containerDataListener().unsubscribe();
  }
}
