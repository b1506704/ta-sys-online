import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonListComponent } from './lesson-list.component';

const routes: Routes = [
  {
    path: '',
    component: LessonListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonListRoutingModule {}
