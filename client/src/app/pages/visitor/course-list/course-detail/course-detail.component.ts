import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseStore } from '../../../../shared/services/course/course-store.service';
import { File } from 'src/app/shared/models/file';
import { FileHttpService } from 'src/app/shared/services/file/file-http.service';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
@Component({
  selector: 'app-course-detail',
  templateUrl: 'course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() courseID!: string;
  courseData!: Course;
  fieldList: Array<Object> = [];
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
  constructor(private courseStore: CourseStore, private fileStore: FileStore) {}

  courseDataListener() {
    return this.courseStore.$courseInstance.subscribe((data: any) => {
      this.courseData = data;
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
    setTimeout(() => {
      this.getUserMediaData(this.courseID);
      this.courseStore.getCourse(this.courseID).then(() => {
        this.courseDataListener();
      });
    }, 100);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.courseDataListener().unsubscribe();
  }
}
