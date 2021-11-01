import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { InstructorStore } from '../../../../shared/services/instructor/instructor-store.service';
import { File } from 'src/app/shared/models/file';
import { FileHttpService } from 'src/app/shared/services/file/file-http.service';
import { UserInfoStore } from 'src/app/shared/services/user-info/user-info-store.service';
import { UserInfo } from 'src/app/shared/models/userinfo';
import { FileStore } from 'src/app/shared/services/file/file-store.service';
@Component({
  selector: 'app-instructor-detail',
  templateUrl: 'instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss'],
})
export class InstructorDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() instructorID!: string;
  instructorData!: UserInfo;
  fieldList: Array<Object> = [];
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
  constructor(
    private userInfoStore: UserInfoStore,
    private fileStore: FileStore
  ) {}

  instructorDataListener() {
    return this.userInfoStore.$userInfoInstance.subscribe((data: any) => {
      this.instructorData = data;
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
    this.instructorData = null;
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
      this.getUserMediaData(this.instructorID);
      this.userInfoStore.getUserInfo(this.instructorID).then(() => {
        this.instructorDataListener();
      });
    }, 100);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.instructorDataListener().unsubscribe();
  }
}
