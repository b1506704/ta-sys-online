import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSubjectListRoutingModule } from './edit-subject-list-routing.module';
import { EditSubjectListComponent } from './edit-subject-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditSubjectListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditSubjectListComponent],
})
export class EditSubjectListModule {}
