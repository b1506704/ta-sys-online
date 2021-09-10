import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditDiscountListComponent } from './edit-discount-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditDiscountListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDiscountListRoutingModule {}
