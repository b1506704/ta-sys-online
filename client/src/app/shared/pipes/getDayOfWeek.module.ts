import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDayOfWeek } from './getDayOfWeek.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [GetDayOfWeek],
  exports: [GetDayOfWeek],
})
export class GetDayOfWeekModule {}
