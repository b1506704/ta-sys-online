import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Lesson } from 'src/app/shared/models/lesson';
import { LessonHttpService } from 'src/app/shared/services/lesson/lesson-http.service';
import { LessonStore } from 'src/app/shared/services/lesson/lesson-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-update-lesson',
  templateUrl: 'update-lesson.component.html',
  styleUrls: ['./update-lesson.component.scss'],
})
export class UpdateLessonComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() lesson: Lesson;
  @Input() title: string;
  @Input() isVisible: boolean;
  @Input() closePopupUpdate: () => void;
  valueType: string = 'string';

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
        this.lessonHTTP.updateLesson(this.lessonData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.closePopupUpdate();
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

  ngOnChanges(): void {
    this.lessonData = this.lesson;
    console.log(this.lesson);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
