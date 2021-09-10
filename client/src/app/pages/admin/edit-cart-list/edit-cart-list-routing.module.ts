import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCartListComponent } from './edit-cart-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditCartListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCartListRoutingModule {}
