import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditInstructorListRoutingModule } from './edit-instructor-list-routing.module';
import { EditInstructorListComponent } from './edit-instructor-list.component';
import { DxDataGridModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    EditInstructorListRoutingModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
  ],
  declarations: [EditInstructorListComponent],
})
export class EditInstructorListModule {}
