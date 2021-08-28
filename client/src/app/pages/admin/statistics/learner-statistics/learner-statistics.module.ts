import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerStatisticsRoutingModule } from './learner-statistics-routing.module';
import { LearnerStatisticsComponent } from './learner-statistics.component';
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
    LearnerStatisticsRoutingModule,
    DxChartModule,
    DxButtonModule,
    DxRangeSelectorModule,
    DxPolarChartModule,
    DxFunnelModule,
    DxPieChartModule,
  ],
  declarations: [LearnerStatisticsComponent],
})
export class LearnerStatisticsModule {}
