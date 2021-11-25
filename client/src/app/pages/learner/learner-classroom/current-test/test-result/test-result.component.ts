import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { DxScrollViewComponent } from 'devextreme-angular';
import { TestRequest } from 'src/app/shared/models/testRequest';

@Component({
  selector: 'app-test-result',
  templateUrl: 'test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
export class TestResultDetailComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;

  @Input() testResult: any;

  @Input() maxScore: any;
  
  @Input() isVisible: boolean;
  testResultData: any;

  constructor(private router: Router) {}

  ngOnChanges(): void {
    this.testResultData = this.testResult;
  }

  finishReview() {
    this.router.navigate(['learner_classroom']);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
