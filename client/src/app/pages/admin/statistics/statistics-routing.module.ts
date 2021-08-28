import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    children: [
      {
        path: 'learner',
        loadChildren: () =>
          import('./learner-statistics/learner-statistics.module').then(
            (m) => m.LearnerStatisticsModule
          ),
      },
      {
        path: 'instructor',
        loadChildren: () =>
          import('./instructor-statistics/instructor-statistics.module').then(
            (m) => m.InstructorStatisticsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticsRoutingModule {}
