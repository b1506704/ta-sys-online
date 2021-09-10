import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCurriculumListComponent } from './edit-curriculum-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditCurriculumListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCurriculumListRoutingModule {}
