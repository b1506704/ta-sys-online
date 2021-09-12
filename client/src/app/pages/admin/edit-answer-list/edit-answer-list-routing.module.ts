import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditAnswerListComponent } from './edit-answer-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditAnswerListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAnswerListRoutingModule {}
