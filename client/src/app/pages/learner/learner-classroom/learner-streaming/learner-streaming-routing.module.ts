import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnerStreamingComponent } from './learner-streaming.component';

const routes: Routes = [
  {
    path: '',
    component: LearnerStreamingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearnerStreamingRoutingModule {}
