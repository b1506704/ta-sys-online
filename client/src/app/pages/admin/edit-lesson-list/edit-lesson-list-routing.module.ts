import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLessonListComponent } from './edit-lesson-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditLessonListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLessonListRoutingModule {}
