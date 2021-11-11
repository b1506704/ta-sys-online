import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Test } from 'src/app/shared/models/test';
import { TestHttpService } from 'src/app/shared/services/test/test-http.service';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-update-test',
  templateUrl: 'update-test.component.html',
  styleUrls: ['./update-test.component.scss'],
})
export class UpdateTestComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() test: Test;
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
      this.testData.description = '';
    },
  };

  testData: Test;

  constructor(
    private testHTTP: TestHttpService,
    private store: StoreService,
    private testStore: TestStore
  ) {}

  onSubmit = (e: any) => {
    e.preventDefault();
    this.testStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.testHTTP.updateTest(this.testData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.closePopupUpdate();
        });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.testData.description = e.value;
  }

  ngOnChanges(): void {
    this.testData = this.test;
    console.log(this.test);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
