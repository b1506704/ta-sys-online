import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeListComponent } from './practice-list.component';

const routes: Routes = [
  {
    path: '',
    component: PracticeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeListRoutingModule {}
