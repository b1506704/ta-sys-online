import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInstructorDetail } from './getInstructorDetail.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [GetInstructorDetail],
  exports: [GetInstructorDetail],
})
export class GetInstructorDetailModule {}
