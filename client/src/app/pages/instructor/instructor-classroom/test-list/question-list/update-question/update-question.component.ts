import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Question } from 'src/app/shared/models/question';
import { QuestionHttpService } from 'src/app/shared/services/question/question-http.service';
import { QuestionStore } from 'src/app/shared/services/question/question-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-update-question',
  templateUrl: 'update-question.component.html',
  styleUrls: ['./update-question.component.scss'],
})
// logic to add/update/remove answers within component
export class UpdateQuestionComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() question: Question;
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
      this.questionData.content = '';
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
        const questionWithoutAnswer: Question = {
          id: this.questionData.id,
          content: this.questionData.content,
          score: this.questionData.score,
          testId: this.questionData.testId,
          // totalCorrectAnswer: this.questionData.totalCorrectAnswer,
        };
        this.questionHTTP
          .updateQuestion(questionWithoutAnswer)
          .subscribe((data: any) => {
            this.store.showNotif(`${data.responseMessage}`, 'custom');
            this.store.setIsLoading(false);
            this.closePopupUpdate();
          });
      }
    });
  };

  onEditorValueChanged(e: any) {
    this.questionData.content = e.value;
  }

  ngOnChanges(): void {
    this.questionData = this.question;
    console.log(this.question);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
