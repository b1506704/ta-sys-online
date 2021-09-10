import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCurriculumListRoutingModule } from './edit-curriculum-list-routing.module';
import { EditCurriculumListComponent } from './edit-curriculum-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditCurriculumListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditCurriculumListComponent],
})
export class EditCurriculumListModule {}
