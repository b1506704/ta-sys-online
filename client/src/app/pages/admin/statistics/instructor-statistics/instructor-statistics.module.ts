import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorStatisticsRoutingModule } from './instructor-statistics-routing.module';
import { InstructorStatisticsComponent } from './instructor-statistics.component';
import {
  DxButtonModule,
  DxChartModule,
  DxFunnelModule,
  DxPieChartModule,
  DxPolarChartModule,
  DxRangeSelectorModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    InstructorStatisticsRoutingModule,
    DxChartModule,
    DxButtonModule,
    DxRangeSelectorModule,
    DxPolarChartModule,
    DxFunnelModule,
    DxPieChartModule,
  ],
  declarations: [InstructorStatisticsComponent],
})
export class InstructorStatisticsModule {}
