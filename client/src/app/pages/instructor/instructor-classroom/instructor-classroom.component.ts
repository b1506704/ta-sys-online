import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';

@Component({
  templateUrl: 'instructor-classroom.component.html',
  styleUrls: ['./instructor-classroom.component.scss'],
})
export class InstructorClassroomComponent implements OnInit, OnDestroy {
  constructor(
    private store: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  classroomName: string;
  courseId: string;
  currentUserId: string;
  courseData: Course;

  navigatePostOptions: any = {
    type: 'normal',
    text: 'Post',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.navigatePost.bind(this),
  };
  navigateTestOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.navigateTest.bind(this),
  };
  navigatePracticeOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.navigateAsset.bind(this),
  };
  navigateChatOptions: any = {
    type: 'normal',
    icon: 'refresh',
    hint: 'Fetch data from server',
    onClick: this.navigateChat.bind(this),
  };

  isPopupChatVisible: boolean;

  navigatePost() {
    const outlet = {
      outlets: { conditionOutlet: ['post_list'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
  }

  navigateLesson() {
    const outlet = {
      outlets: { conditionOutlet: ['lesson_list'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
  }

  navigateTest() {
    const outlet = {
      outlets: { conditionOutlet: ['test_list'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
  }

  navigateSessionList() {
    const outlet = {
      outlets: { conditionOutlet: ['session_list'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
  }

  navigateCurrentSession() {
    this.router.navigate(['course_streaming']);
  }

  navigateAsset() {
    const outlet = {
      outlets: { conditionOutlet: ['asset_list'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
  }

  navigateChat() {
    const outlet = {
      outlets: { conditionOutlet: ['chat_room'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
  }

  navigateToScheduleList() {
    this.router.navigate(['/schedule_list']);
  }

  getMetaData() {
    return this.store.$currentCourse.subscribe((data: Course) => {
      if (data) {
        this.courseData = data;
        console.log(this.courseData);
        this.courseId = this.courseData.id;
        this.classroomName = this.courseData.name;
      }
    });
  }

  openChatPopup() {
    this.isPopupChatVisible = true;
  }

  closeChatPopup = () => {
    this.isPopupChatVisible = false;
  };

  getUserID() {
    return this.store.$currentUserId.subscribe((data: string) => {
      if (data) {
        this.currentUserId = data;
      }
    });
  }

  ngOnInit(): void {
    this.getMetaData();
    this.getUserID();
    this.navigatePost();
  }

  ngOnDestroy(): void {
    this.getUserID().unsubscribe();
    this.getMetaData().unsubscribe();
  }
}
