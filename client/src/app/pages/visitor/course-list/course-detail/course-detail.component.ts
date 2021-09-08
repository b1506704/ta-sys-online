import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseStore } from '../../../../shared/services/course/course-store.service';
import { Image } from 'src/app/shared/models/image';
import { ImageHttpService } from 'src/app/shared/services/image/image-http.service';
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
  constructor(
    private courseStore: CourseStore,
    private imageService: ImageHttpService
  ) {}

  courseDataListener() {
    return this.courseStore.$courseInstance.subscribe((data: any) => {
      this.courseData = data;
      this.imageService.getImageBySourceID(data._id).subscribe((data: any) => {
        if (data !== null) {
          this.imageData = data;
        }
      });
    });
  }

  renderSourceData() {
    this.courseData = null;
    this.imageData = {
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
