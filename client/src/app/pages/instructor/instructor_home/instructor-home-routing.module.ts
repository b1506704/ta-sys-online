import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorHomeComponent } from './instructor-home.component';

const routes: Routes = [
  {
    path: '',
    component: InstructorHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorHomeRoutingModule {}
