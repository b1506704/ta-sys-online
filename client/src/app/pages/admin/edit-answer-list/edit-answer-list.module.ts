import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditAnswerListRoutingModule } from './edit-answer-list-routing.module';
import { EditAnswerListComponent } from './edit-answer-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditAnswerListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditAnswerListComponent],
})
export class EditAnswerListModule {}
