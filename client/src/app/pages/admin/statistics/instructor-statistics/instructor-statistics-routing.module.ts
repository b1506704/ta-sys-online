import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorStatisticsComponent } from './instructor-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorStatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorStatisticsRoutingModule {}
