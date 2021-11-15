import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Router } from '@angular/router';
import { DxGalleryComponent } from 'devextreme-angular';
import { CourseStore } from 'src/app/shared/services/course/course-store.service';
import { Course } from 'src/app/shared/models/course';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { File } from 'src/app/shared/models/file';
import { UserStore } from 'src/app/shared/services/user/user-store.service';
import { InstructorStore } from 'src/app/shared/services/instructor/instructor-store.service';
import { UserInfoStore } from 'src/app/shared/services/user-info/user-info-store.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // @ViewChild('intro', { static: true }) intro: ElementRef<HTMLDivElement>;
  // @ViewChild('title', { static: true }) title: ElementRef<HTMLDivElement>;
  // @ViewChild('subtitle', { static: true }) subtitle: ElementRef<HTMLDivElement>;
  @ViewChild('feature1', { static: true }) feature1: ElementRef<HTMLDivElement>;
  // @ViewChild('feature2', { static: true }) feature2: ElementRef<HTMLDivElement>;
  // @ViewChild('organization1', { static: true })
  // organization1: ElementRef<HTMLDivElement>;
  @ViewChild('organization2', { static: true })
  organization2: ElementRef<HTMLDivElement>;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private courseStore: CourseStore,
    private userStore: UserStore,
    private fileStore: FileStore,
    private instructorStore: InstructorStore,
    private userInfoStore: UserInfoStore
  ) {}
  @ViewChild(DxGalleryComponent, { static: false })
  dxGallery: DxGalleryComponent;
  baseImgUrl: string = '../../../../assets/imgs/';
  currentFilterByPropertyValue: string;
  currentFilterProperty: string = 'roleId';
  currentCourse: any;
  currentMiniCourse: any;
  currentInstructor: any;
  currentMiniInstructor: any;
  date: Number = new Date().getFullYear();
  learnerFeature: Array<Object> = [
    {
      title: '',
      subTitle: '',
      imgUrl: this.baseImgUrl + 'landing_page_1.jpg',
      link: '',
    },
  ];
  instructorFeature: Array<Object> = [
    {
      title: '',
      subTitle: '',
      imgUrl: this.baseImgUrl + 'landing_page_1.jpg',
      link: '',
    },
  ];
  slideshowDelay: number = 2500;
  featureList: Array<any>;
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
  courseList!: Array<Course>;
  instructorList!: Array<Course>;
  fileList: Array<File> = [];
  pageSize: number = 10;
  isCourseDetailPopupVisible: boolean = false;
  isInstructorDetailPopupVisible: boolean = false;

  onCourseSelectionChanged(e: any) {
    this.currentMiniCourse = e.addedItems[0];
  }

  onInstructorSelectionChanged(e: any) {
    this.userInfoStore.getUserInfo(e.addedItems[0]?.id).then(() => {
      this.instructorMiniDetailListener();
    });
  }

  navigateCourse(id: string) {
    this.currentCourse = id;
    this.isCourseDetailPopupVisible = true;
  }

  navigateInstructor(id: string) {
    this.currentInstructor = id;
    this.isInstructorDetailPopupVisible = true;
  }

  instructorMiniDetailListener() {
    return this.userInfoStore.$userInfoInstance.subscribe((data: any) => {
      this.currentMiniInstructor = data;
    });
  }

  initTimeline() {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: '.title',
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'restart none none reset',
        },
      })
      .from('.title', {
        yPercent: -100,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back',
      })
      .from('.title', { opacity: 0, stagger: 0.05, duration: 0.2 }, 0)
      .from(
        '.subtitle',
        { opacity: 0, stagger: 0.05, duration: 0.5, delay: 0.5 },
        0
      )
      .from('.subtitle', {
        yPercent: -50,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back',
      });
  }

  initFeatureTimeline() {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: this.feature1.nativeElement,
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'restart none none reset',
        },
      })
      .from(this.feature1.nativeElement, {
        yPercent: -100,
        stagger: 0.05,
        duration: 2.5,
        ease: 'back',
      })
      .from(
        this.feature1.nativeElement,
        { opacity: 0, stagger: 0.05, duration: 0.2 },
        0
      );
  }

  courseDataListener() {
    return this.courseStore.$courseList.subscribe((data: any) => {
      this.courseList = data;
    });
  }

  instructorDataListener() {
    return this.instructorStore.$instructorList.subscribe((data: any) => {
      this.instructorList = data;
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

  initCourseData() {
    this.courseStore.initInfiniteData(1, this.pageSize).then(() => {
      this.courseDataListener();
      this.fileDataListener();
    });
  }

  initInstructorData() {
    this.userStore.getRole().then(() => {
      this.userStore.$roleList.subscribe((data: Array<any>) => {
        this.currentFilterByPropertyValue = data.find(
          (e: any) => e.name === 'Instructor'
        )?.id;
        this.instructorStore
          .initInfiniteData(
            this.currentFilterProperty,
            this.currentFilterByPropertyValue,
            1,
            this.pageSize
          )
          .then(() => {
            this.instructorDataListener();
            this.fileDataListener();
          });
      });
    });
  }

  ngOnInit() {
    this.initCourseData();
    this.initInstructorData();
    this.initTimeline().then(() => {
      this.initFeatureTimeline();
    });
  }
}
