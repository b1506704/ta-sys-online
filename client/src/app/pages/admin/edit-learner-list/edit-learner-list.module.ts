import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLearnerListRoutingModule } from './edit-learner-list-routing.module';
import { EditLearnerListComponent } from './edit-learner-list.component';
import {
  DxDataGridModule,
  DxToolbarModule,
  DxButtonModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditLearnerListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditLearnerListComponent],
})
export class EditLearnerModule {}
