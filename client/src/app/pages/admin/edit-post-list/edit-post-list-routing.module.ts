import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPostListComponent } from './edit-post-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditPostListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPostListRoutingModule {}
