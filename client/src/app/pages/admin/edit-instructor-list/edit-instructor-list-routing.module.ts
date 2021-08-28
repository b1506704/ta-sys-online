import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditInstructorListComponent } from './edit-instructor-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditInstructorListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInstructorListRoutingModule {}
