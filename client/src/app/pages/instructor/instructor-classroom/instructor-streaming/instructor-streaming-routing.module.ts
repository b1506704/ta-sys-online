import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorStreamingComponent } from './instructor-streaming.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorStreamingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorStreamingRoutingModule {}
