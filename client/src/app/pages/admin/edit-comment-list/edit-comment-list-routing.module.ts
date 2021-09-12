import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCommentListComponent } from './edit-comment-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditCommentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCommentListRoutingModule {}
