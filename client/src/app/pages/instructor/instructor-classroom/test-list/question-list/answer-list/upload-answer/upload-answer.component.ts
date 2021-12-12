import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Answer } from 'src/app/shared/models/answer';
import { AnswerHttpService } from 'src/app/shared/services/answer/answer-http.service';
import { AnswerStore } from 'src/app/shared/services/answer/answer-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-upload-answer',
  templateUrl: 'upload-answer.component.html',
  styleUrls: ['./upload-answer.component.scss'],
})
// logic to add/update/remove answers within component
export class UploadAnswerComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  currentQuestionId: string;

  @Input() questionId: string;
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
      this.answerData.content = '';
    },
  };

  answerData: Answer;

  constructor(
    private answerHTTP: AnswerHttpService,
    private store: StoreService,
    private answerStore: AnswerStore
  ) {}

  onSubmit = (e: any) => {
    e.preventDefault();
    this.answerStore.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.store.setIsLoading(true);
        this.answerStore.setIsUploading(true);
        this.answerHTTP.uploadAnswer(this.answerData).subscribe((data: any) => {
          this.store.showNotif(`${data.responseMessage}`, 'custom');
          this.store.setIsLoading(false);
          this.answerStore.setIsUploading(false);
          this.answerData.isCorrect = false;
          this.answerData.content = '';
          // this.answerData = {
          //   isCorrect: false,
          //   questionId: '',
          //   content: '',
          // };
          this.closePopupUpload();
        });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.answerData.content = e.value;
    console.log(e.value);
  }

  questionIdListener() {
    return this.store.$currentQuestionId.subscribe((data: any) => {
      if (data) {
        this.answerData.questionId = data;
      }
    });
  }

  ngOnInit(): void {
    this.answerData = {
      isCorrect: false,
      questionId: '',
      content: '',
    };
    this.questionIdListener();
  }

  ngOnDestroy(): void {
    this.questionIdListener().unsubscribe();
  }
}
