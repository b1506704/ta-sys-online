import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Instructor } from 'src/app/shared/models/instructor';
import { InstructorStore } from '../../../../shared/services/instructor/instructor-store.service';
import { Image } from 'src/app/shared/models/image';
import { ImageHttpService } from 'src/app/shared/services/image/image-http.service';
@Component({
  selector: 'app-instructor-detail',
  templateUrl: 'instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss'],
})
export class InstructorDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() instructorID!: string;
  instructorData!: Instructor;
  fieldList: Array<Object> = [];
  imageData: Image = {
    sourceID: '',
    category: '',
    title: '',
    fileName: '',
    fileSize: 0,
    fileType: '',
    url: '../../../../assets/imgs/profile.png',
  };
  constructor(
    private instructorStore: InstructorStore,
    private imageService: ImageHttpService
  ) {}

  instructorDataListener() {
    return this.instructorStore.$instructorInstance.subscribe((data: any) => {
      this.instructorData = data;
      this.imageService.getImageBySourceID(data._id).subscribe((data: any) => {
        if (data !== null) {
          this.imageData = data;
        }
      });
    });
  }

  renderSourceData() {
    this.instructorData = null;
    setTimeout(() => {
      this.instructorStore.getInstructor(this.instructorID).then(() => {
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
