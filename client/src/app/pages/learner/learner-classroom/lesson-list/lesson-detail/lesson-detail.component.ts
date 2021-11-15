import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: 'lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss'],
})
export class LessonDetailComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;

  @Input() lesson: Lesson;
  @Input() isVisible: boolean;
  @Input() closeDetailPopup: () => void;
  valueType: string = 'string';
  lessonData: Lesson;

  constructor() {}

  ngOnChanges(): void {
    this.lessonData = null;
    setTimeout(() => {
      this.lessonData = this.lesson;
    }, 200);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
