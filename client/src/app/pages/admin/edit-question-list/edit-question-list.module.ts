import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditQuestionListRoutingModule } from './edit-question-list-routing.module';
import { EditQuestionListComponent } from './edit-question-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditQuestionListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditQuestionListComponent],
})
export class EditQuestionListModule {}
