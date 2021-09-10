import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditSessionListComponent } from './edit-session-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditSessionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSessionListRoutingModule {}
