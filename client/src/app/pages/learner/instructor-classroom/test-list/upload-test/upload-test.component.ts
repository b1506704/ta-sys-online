import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Test } from 'src/app/shared/models/test';
import { TestHttpService } from 'src/app/shared/services/test/test-http.service';
import { TestStore } from 'src/app/shared/services/test/test-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-upload-test',
  templateUrl: 'upload-test.component.html',
  styleUrls: ['./upload-test.component.scss'],
})
export class UploadTestComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() courseId: string;
  @Input() title: string;
  @Input() isVisible: boolean;
  @Input() closePopupUpload: () => void;
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
        this.testStore.setIsUploading(true);
        this.testHTTP.uploadTest(this.testData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.testStore.setIsUploading(false);
          this.closePopupUpload();
        });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.testData.description = e.value;
  }

  ngOnInit() {
    this.testData = {
      courseId: this.courseId,
      description: '',
      allocatedTime: 0,
      deadline: new Date(),
      maxAttempt: 0,
      totalQuestions: 0,
      maxScore: 0,
      name: 'Blank Test',
    };
  }

  ngOnDestroy() {}
}
