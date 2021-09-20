import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorStreamingRoutingModule } from './instructor-streaming-routing.module';
import { InstructorStreamingComponent } from './instructor-streaming.component';
import { DxButtonModule, DxFormModule, DxListModule, DxScrollViewModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    InstructorStreamingRoutingModule,
    DxButtonModule,
    DxScrollViewModule,
    DxListModule,
    DxFormModule
  ],
  declarations: [InstructorStreamingComponent],
})
export class InstructorStreamingModule {}
