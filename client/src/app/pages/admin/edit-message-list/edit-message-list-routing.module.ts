import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMessageListComponent } from './edit-message-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditMessageListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMessageListRoutingModule {}
