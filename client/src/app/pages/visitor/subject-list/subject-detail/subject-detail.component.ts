import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'src/app/shared/models/subject';
import { SubjectStore } from '../../../../shared/services/subject/subject-store.service';
import { Image } from 'src/app/shared/models/image';
import { ImageHttpService } from 'src/app/shared/services/image/image-http.service';
@Component({
  selector: 'app-subject-detail',
  templateUrl: 'subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss'],
})
export class SubjectDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() subjectID!: string;
  subjectData!: Subject;
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
    private subjectStore: SubjectStore,
    private imageService: ImageHttpService
  ) {}

  subjectDataListener() {
    return this.subjectStore.$subjectInstance.subscribe((data: any) => {
      this.subjectData = data;
      this.imageService.getImageBySourceID(data._id).subscribe((data: any) => {
        if (data !== null) {
          this.imageData = data;
        }
      });
    });
  }

  renderSourceData() {
    this.subjectData = null;
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
      this.subjectStore.getSubject(this.subjectID).then(() => {
        this.subjectDataListener();
      });
    }, 100);
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.subjectDataListener().unsubscribe();
  }
}
