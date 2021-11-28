import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveFilterUser } from './removeFilterUser.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [RemoveFilterUser],
  exports: [RemoveFilterUser],
})
export class RemoveFilterUserModule {}
