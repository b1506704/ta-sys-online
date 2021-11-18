import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentTestComponent } from './current-test.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTestRoutingModule {}
