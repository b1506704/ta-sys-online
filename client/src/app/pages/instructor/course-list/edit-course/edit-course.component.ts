import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseStore } from '../../../../shared/services/course/course-store.service';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserInfo } from 'src/app/shared/models/userinfo';
import { UserInfoStore } from 'src/app/shared/services/user-info/user-info-store.service';
import { DxScrollViewComponent, DxFormComponent } from 'devextreme-angular';
import { CourseHttpService } from 'src/app/shared/services/course/course-http.service';
@Component({
  selector: 'app-edit-course',
  templateUrl: 'edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;
  @Input() courseID!: string;
  courseData!: Course;
  //
  userId!: string;
  instructorData: UserInfo;
  currency: string = '$';
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

  tempUrl: string = '';

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
    onClick: () => {
      this.courseData.description = '';
    },
  };
  constructor(
    private courseStore: CourseStore,

    private userStore: UserInfoStore,

    private courseHTTP: CourseHttpService,
    private fileStore: FileStore,
    private store: StoreService
  ) {}

  courseDataListener() {
    return this.courseStore.$courseInstance.subscribe((data: any) => {
      this.courseData = data;
      this.userStore.getUserInfo(this.courseData.instructorId);
      this.instructorDataListener();
    });
  }

  instructorDataListener() {
    return this.userStore.$userInfoInstance.subscribe((data: any) => {
      if (data) {
        this.instructorData = data;
      }
    });
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    console.log(file);
    if (file !== undefined) {
      if (file.size <= 2000000) {
        this.fileData.fileSize = file.size;
        this.fileData.fileType = file.type;
        this.fileData.fileName = file.name;
        var pattern = /image-*/;
        var reader = new FileReader();

        if (!file.type.match(pattern)) {
          this.store.showNotif('Invalid format!', 'custom');
          return;
        }
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
      } else {
        this.store.showNotif('File cannot exceed 2MB', 'custom');
      }
    }
  }

  handleReaderLoaded(e: any) {
    var reader = e.target;
    console.log('READER');
    console.log(reader);
    this.fileData.sourceID = this.courseData.id;
    this.fileData.container = 'images';
    this.fileData.category = 'images';
    this.fileData.title = this.courseData.name;
    this.fileData.data = reader.result.split(',')[1];
    this.fileData.url = reader.result;
    console.log('SOURCE ID');
    console.log(this.fileData.sourceID);
  }

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data !== null) {
        this.fileData = data.data[0];
        this.tempUrl = this.fileData.url;
      }
    });
  }

  renderSourceData() {
    // this.courseData = null;
    this.fileData = {
      sourceID: '',
      container: '',
      category: '',
      title: '',
      fileName: '',
      fileSize: 0,
      fileType: '',
      url: '../../../../assets/imgs/profile.png',
    };
    this.getUserMediaData(this.courseID);
    this.courseStore.getCourse(this.courseID).then(() => {
      this.courseDataListener();
    });
  }

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.userId = data;
      }
    });
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    this.courseStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.courseHTTP.updateCourse(this.courseData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
        });
        if (
          this.fileData.url !== '../../../../assets/imgs/profile.png' &&
          this.fileData.url !== this.tempUrl
        ) {
          this.fileStore.uploadFiles([this.fileData]);
        }
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.courseData.description = e.value;
  }

  ngOnInit(): void {
    this.getUserID();
  }

  ngOnChanges(): void {
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.courseDataListener().unsubscribe();
    this.instructorDataListener().unsubscribe();
  }
}
