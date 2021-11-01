import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorClassroomComponent } from './instructor-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorClassroomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorClassroomRoutingModule {}
