import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { InstructorStore } from '../../../../shared/services/instructor/instructor-store.service';
import { Image } from 'src/app/shared/models/image';
import { ImageHttpService } from 'src/app/shared/services/image/image-http.service';
import { UserInfoStore } from 'src/app/shared/services/user-info/user-info-store.service';
import { UserInfo } from 'src/app/shared/models/userinfo';
@Component({
  selector: 'app-instructor-detail',
  templateUrl: 'instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss'],
})
export class InstructorDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() instructorID!: string;
  instructorData!: UserInfo;
  fieldList: Array<Object> = [];
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
    private userInfoStore: UserInfoStore,
    private imageService: ImageHttpService
  ) {}

  instructorDataListener() {
    return this.userInfoStore.$userInfoInstance.subscribe((data: any) => {
      this.instructorData = data;      
      // this.imageService.getImageBySourceID(data._id).subscribe((data: any) => {
      //   if (data !== null) {
      //     this.imageData = data;
      //   }
      // });
    });
  }

  renderSourceData() {
    this.instructorData = null;
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
