import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Test } from 'src/app/shared/models/test';
import formatCurrency from 'src/app/utils/formatCurrency';
import { TestStore } from '../../../../shared/services/test/test-store.service';
@Component({
  selector: 'app-test-detail',
  templateUrl: 'test-detail.component.html',
  styleUrls: ['./test-detail.component.scss'],
})
export class TestDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() testID!: string;
  testData!: Test;
  price!: string;

  constructor(private testStore: TestStore) {}

  testDataListener() {
    return this.testStore.$testInstance.subscribe((data: any) => {
      this.testData = data;
      // setTimeout(() => {
      // this.price = formatCurrency(this.testData.price, '$');
      // }, 100);
    });
  }

  renderSourceData() {
    this.testData = null;
    this.price = null;
    setTimeout(() => {
      this.testStore.getTest(this.testID).then(() => {
        this.testDataListener();
      });
    }, 100);
  }

  // formatCurrency() {
  //   return formatCurrency(this.testData.price, '$');
  // }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.renderSourceData();
  }

  ngOnDestroy(): void {
    this.testDataListener().unsubscribe();
  }
}
