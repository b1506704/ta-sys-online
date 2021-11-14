import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Lesson } from 'src/app/shared/models/lesson';
import { LessonHttpService } from 'src/app/shared/services/lesson/lesson-http.service';
import { LessonStore } from 'src/app/shared/services/lesson/lesson-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-upload-lesson',
  templateUrl: 'upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.scss'],
})
export class UploadLessonComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() courseId: string;
  @Input() title: string;
  @Input() isVisible: boolean;
  @Input() closePopupUpload: () => void;
  valueType: string = 'string';
  currentTabList: any;
  selectedIndex: any;
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
      this.dxForm.instance.resetValues();
      this.lessonData.description = '';
      this.lessonData.frontText = '';
      this.lessonData.backText = '';
    },
  };

  lessonData: Lesson;

  constructor(
    private lessonHTTP: LessonHttpService,
    private store: StoreService,
    private lessonStore: LessonStore
  ) {}

  onSubmit = (e: any) => {
    e.preventDefault();
    this.lessonStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.lessonStore.setIsUploading(true);
        this.lessonHTTP.uploadLesson(this.lessonData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.lessonStore.setIsUploading(false);
          this.closePopupUpload();
        });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.lessonData.description = e.value;
  }

  onEditorFrontTextValueChanged(e: any) {
    this.lessonData.frontText = e.value;
  }

  onEditorBackTextValueChanged(e: any) {
    this.lessonData.backText = e.value;
  }

  ngOnInit() {
    this.lessonData = {
      name: 'Blank lesson',
      backText: '',
      courseId: this.courseId,
      frontText: '',
      description: '',
    };
  }

  ngOnDestroy() {}
}
