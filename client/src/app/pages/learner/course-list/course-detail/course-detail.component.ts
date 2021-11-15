import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseStore } from '../../../../shared/services/course/course-store.service';
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { CartStore } from 'src/app/shared/services/cart/cart-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { User } from 'src/app/shared/models/user';
import { UserInfo } from 'src/app/shared/models/userinfo';
import { UserInfoStore } from 'src/app/shared/services/user-info/user-info-store.service';
@Component({
  selector: 'app-course-detail',
  templateUrl: 'course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() courseID!: string;
  courseData!: Course;
  fieldList: Array<Object> = [];
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
  showSuccess: boolean;
  isLogin: boolean;
  constructor(
    private courseStore: CourseStore,

    private userStore: UserInfoStore,
    private fileStore: FileStore,
    private store: StoreService,
    private cartStore: CartStore
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

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data !== null) {
        this.fileData = data.data[0];
      }
    });
  }

  renderSourceData() {
    this.courseData = null;
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

  addToCart() {
    this.cartStore.addToCart(this.courseData, this.userId);
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
