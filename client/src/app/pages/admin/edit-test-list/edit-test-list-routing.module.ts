import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTestListComponent } from './edit-test-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditTestListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTestListRoutingModule {}
