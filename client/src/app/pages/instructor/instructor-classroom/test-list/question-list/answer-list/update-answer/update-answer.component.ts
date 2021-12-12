import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxFormComponent, DxScrollViewComponent } from 'devextreme-angular';
import { Answer } from 'src/app/shared/models/answer';
import { AnswerHttpService } from 'src/app/shared/services/answer/answer-http.service';
import { AnswerStore } from 'src/app/shared/services/answer/answer-store.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-update-answer',
  templateUrl: 'update-answer.component.html',
  styleUrls: ['./update-answer.component.scss'],
})
// logic to add/update/remove answers within component
export class UpdateAnswerComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;
  @ViewChild(DxFormComponent, { static: false })
  dxForm: DxFormComponent;

  @Input() answer: Answer;
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
      // this.answerData.content = '';
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
        this.answerStore.setIsCreating(true);
        this.answerHTTP.updateAnswer(this.answerData).subscribe({
          next: (data: any) => {
            this.store.showNotif(`${data.responseMessage}`, 'custom');
            this.store.setIsLoading(false);
            this.closePopupUpdate();
          },
          error: (data: any) => {
            this.store.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
    // this.answerStore.confirmDialog('').then((confirm: boolean) => {
    //   if (confirm) {
    //     this.store.setIsLoading(true);
    //     this.answerHTTP.updateAnswer(this.answerData).subscribe((data: any) => {
    //       this.store.showNotif(`${data.responseMessage}`, 'custom');
    //       this.store.setIsLoading(false);
    //       this.closePopupUpdate();
    //     });
    //   }
    // });
  };

  onEditorValueChanged(e: any) {
    this.answerData.content = e.value;
    console.log(e.value);
  }

  ngOnChanges(): void {
    this.answerData = this.answer;
    console.log('UPDATED ANSWER');
    console.log(this.answerData);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
