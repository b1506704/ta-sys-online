import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSubjectListComponent } from './edit-subject-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditSubjectListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSubjectListRoutingModule {}
