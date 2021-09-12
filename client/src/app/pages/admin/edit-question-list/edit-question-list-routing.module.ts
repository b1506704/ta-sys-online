import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditQuestionListComponent } from './edit-question-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditQuestionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditQuestionListRoutingModule {}
