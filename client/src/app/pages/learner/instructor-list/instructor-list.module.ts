import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorListRoutingModule } from './instructor-list-routing.module';
import { InstructorListComponent } from './instructor-list.component';
import {
  DxScrollViewModule,
  DxToolbarModule,
  DxButtonModule,
  DxSpeedDialActionModule,
  DxPopupModule,
  DxFormModule,
} from 'devextreme-angular';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';

@NgModule({
  imports: [
    CommonModule,
    InstructorListRoutingModule,
    DxScrollViewModule,
    DxToolbarModule,
    DxButtonModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxFormModule
  ],
  declarations: [InstructorListComponent, InstructorDetailComponent],
})
export class InstructorListModule {}
