import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerStatisticsComponent } from './learner-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerStatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerStatisticsRoutingModule {}
