import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/shared/services/streaming/signalr.service';
import { signalRConfig } from 'src/app/shared/services/streaming/signalr.config';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserEntry } from 'src/app/shared/models/user-entry';
import { ChatMessage } from 'src/app/shared/models/chat-message';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { File } from 'src/app/shared/models/file';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/course';

@Component({
  templateUrl: 'learner-classroom.component.html',
  styleUrls: ['./learner-classroom.component.scss'],
})
export class LearnerClassroomComponent implements OnInit, OnDestroy {
  constructor(
    private signaling: SignalrService,
    private store: StoreService,
    private fileStore: FileStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  classroomName: string;
  courseId: string;
  currentUserId: string;
  notificationList: Array<any> = [];
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
    const outlet = {
      outlets: { conditionOutlet: ['current_session'] },
    };
    this.router.navigate([outlet], { relativeTo: this.route.parent });
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
    // this.signaling.connect('/auth', false).then(() => {
    //   if (this.signaling.isConnected()) {
    //     this.signaling.invoke('Authorize').then((token: string) => {
    //       if (token) {
    //         sessionStorage.setItem('token', token);
    //         this.start();
    //       }
    //     });
    //   }
    // });
  }

  start(): void {
    // #1 connect to signaling server
    this.signaling.connect('/streaming', true).then(() => {
      if (this.signaling.isConnected()) {
        this.signaling.invoke(
          'CreateOrJoinRoom',
          this.classroomName,
          this.currentUserId
        );
      }
    });
    this.defineSignaling();
  }

  defineSignaling(): void {
    this.signaling.define('log', (message: any) => {
      console.log(message);
    });

    this.signaling.define('created', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
    });

    this.signaling.define('joined', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
    });

    this.signaling.define('left', (userEntryList: any) => {
      console.log('CURRENT USER ENTRY LIST');
      console.log(userEntryList);
    });
  }

  hangup(): void {
    console.log('Hanging up.');
    this.signaling
      .invoke('LeaveRoom', this.classroomName, this.currentUserId)
      .then(() => {
        this.signaling.disconnect();
      });
  }

  ngOnDestroy(): void {
    this.getUserID().unsubscribe();
    this.getMetaData().unsubscribe();
    this.hangup();
  }
}
