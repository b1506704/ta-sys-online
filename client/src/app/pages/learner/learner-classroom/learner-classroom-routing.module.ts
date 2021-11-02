import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerClassroomComponent } from './learner-classroom.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerClassroomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerClassroomRoutingModule {}
