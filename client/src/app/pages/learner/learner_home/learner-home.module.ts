import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnerHomeComponent } from './learner-home.component';
import { LearnerHomeRoutingModule } from './learner-home-routing.module';
import { DxGalleryModule, DxButtonModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    LearnerHomeRoutingModule,
    DxGalleryModule,
    DxButtonModule,
  ],
  declarations: [LearnerHomeComponent],
})
export class LearnerHomeModule {}
