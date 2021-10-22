import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorHomeRoutingModule } from './instructor-home-routing.module';
import { InstructorHomeComponent } from './instructor-home.component';
import { DxButtonModule, DxGalleryModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    InstructorHomeRoutingModule,
    DxGalleryModule,
    DxButtonModule,
  ],
  declarations: [InstructorHomeComponent],
})
export class InstructorHomeModule {}
