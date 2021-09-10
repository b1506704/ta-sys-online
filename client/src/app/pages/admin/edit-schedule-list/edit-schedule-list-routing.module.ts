import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditScheduleListComponent } from './edit-schedule-list.component';

const routes: Routes = [
  {
    path: '',
    component: EditScheduleListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditScheduleListRoutingModule {}
