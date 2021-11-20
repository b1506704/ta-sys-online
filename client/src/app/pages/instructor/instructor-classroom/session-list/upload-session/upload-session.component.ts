import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Session } from 'src/app/shared/models/session';
import { SessionStore } from '../../../../../shared/services/session/session-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserInfo } from 'src/app/shared/models/userinfo';
import { DxScrollViewComponent, DxFormComponent } from 'devextreme-angular';
import { SessionHttpService } from 'src/app/shared/services/session/session-http.service';
@Component({
  selector: 'app-upload-session',
  templateUrl: 'upload-session.component.html',
  styleUrls: ['./upload-session.component.scss'],
})
export class UploadSessionComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;
  @Input() courseId!: string;
  sessionData: Session;
  //
  userId!: string;
  instructorData: UserInfo;
  currency: string = '$';
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
      this.sessionData.startTime = new Date();
      this.sessionData.endTime = new Date();
    },
  };
  constructor(
    private sessionStore: SessionStore,

    private sessionHTTP: SessionHttpService,
    private store: StoreService
  ) {}

  sessionDataListener() {
    return this.sessionStore.$sessionInstance.subscribe((data: any) => {
      this.sessionData = data;
    });
  }

  onStartTimeValueChange(e: any) {
    this.sessionData.startTime = e.value;
  }

  onEndTimeValueChange(e: any) {
    this.sessionData.endTime = e.value;
  }
  renderSourceData() {
    this.sessionData = {
      courseId: this.courseId,
      creatorId: this.userId,
      startTime: new Date(),
      endTime: new Date(),
    };
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
    this.sessionStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.sessionHTTP
          .uploadSession(this.sessionData)
          .subscribe((data: any) => {
            this.store.showNotif(`${data.responseMessage}`, 'custom');
            this.store.setIsLoading(false);
          });
      }
    });
  };

  ngOnInit(): void {
    this.getUserID();
    this.renderSourceData();
  }

  ngOnChanges(): void {}

  ngOnDestroy(): void {
    this.sessionDataListener().unsubscribe();
  }
}
