import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Test } from 'src/app/shared/models/test';

@Component({
  selector: 'app-test-detail',
  templateUrl: 'test-detail.component.html',
  styleUrls: ['./test-detail.component.scss'],
})
export class TestDetailComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;

  @Input() test: Test;
  @Input() isVisible: boolean;
  @Input() closeDetailPopup: () => void;
  valueType: string = 'string';
  testData: Test;

  constructor() {}

  ngOnChanges(): void {
    this.testData = null;
    setTimeout(() => {
      this.testData = this.test;
    }, 200);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
