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
import { File } from 'src/app/shared/models/file';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserInfo } from 'src/app/shared/models/userinfo';
import { UserInfoStore } from 'src/app/shared/services/user-info/user-info-store.service';
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
      this.sessionData.startTime = new Date();
      this.sessionData.endTime = new Date();
    },
  };
  constructor(
    private sessionStore: SessionStore,

    private sessionHTTP: SessionHttpService,
    private fileStore: FileStore,
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
    this.fileData.sourceID = this.sessionData.id;
    this.fileData.container = 'images';
    this.fileData.category = 'images';
    this.fileData.title = this.sessionData?.startTime.toString();
    this.fileData.data = reader.result.split(',')[1];
    this.fileData.url = reader.result;
    console.log('SOURCE ID');
    console.log(this.fileData.sourceID);
  }

  getUserMediaData(id: string) {
    this.fileStore.getFile(id).then((data: any) => {
      if (data.data) {
        this.fileData = data.data[0];
        this.tempUrl = this.fileData.url;
      }
    });
  }

  renderSourceData() {
    // this.sessionData = null;
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
        if (
          this.fileData.url !== '../../../../assets/imgs/profile.png' &&
          this.fileData.url !== this.tempUrl
        ) {
          this.fileStore.uploadFiles([this.fileData]);
        }
      }
    });
  };

  ngOnInit(): void {
    this.getUserID();
    this.renderSourceData();
  }

  ngOnChanges(): void {
    // this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.sessionDataListener().unsubscribe();
  }
}
