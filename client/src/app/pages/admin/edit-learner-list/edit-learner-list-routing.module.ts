import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLearnerListComponent } from './edit-learner-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditLearnerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditLearnerListRoutingModule {}
