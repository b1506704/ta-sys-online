import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserInfoListComponent } from './edit-user-info-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditUserInfoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserInfoListRoutingModule {}
