import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Question } from 'src/app/shared/models/question';
import { QuestionHttpService } from 'src/app/shared/services/question/question-http.service';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-upload-question',
  templateUrl: 'upload-question.component.html',
  styleUrls: ['./upload-question.component.scss'],
})
// logic to add/update/remove answers within component
export class UploadQuestionComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() testId: string;
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
      // this.questionData.content = '';
    },
  };

  questionData: Question;

  constructor(
    private questionHTTP: QuestionHttpService,
    private store: StoreService,
    private questionStore: QuestionStore
  ) {}

  onSubmit = (e: any) => {
    e.preventDefault();
    this.questionStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.questionStore.setIsUploading(true);
        this.questionHTTP
          .uploadQuestion(this.questionData)
          .subscribe((data: any) => {
            this.store.showNotif(`${data.responseMessage}`, 'custom');
            this.store.setIsLoading(false);
            this.questionStore.setIsUploading(false);
            this.closePopupUpload();
          });
      }
    });
  };

  onEditorValueChanged(e: any) {
    // this.questionData.content = e.value;
    console.log(e.value);
  }

  ngOnInit() {
    // this.questionData = {
    //   courseId: this.courseId,
    //   content: '',
    //   title: 'New blank question',
    // };
  }

  ngOnDestroy() {}
}
