import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerHomeComponent } from './learner-home.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerHomeRoutingModule {}
