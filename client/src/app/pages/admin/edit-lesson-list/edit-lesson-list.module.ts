import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLessonListRoutingModule } from './edit-lesson-list-routing.module';
import { EditLessonListComponent } from './edit-lesson-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditLessonListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditLessonListComponent],
})
export class EditLessonListModule {}
