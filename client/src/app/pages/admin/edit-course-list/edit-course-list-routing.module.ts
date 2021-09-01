import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCourseListComponent } from './edit-course-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditCourseListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCourseListRoutingModule {}
