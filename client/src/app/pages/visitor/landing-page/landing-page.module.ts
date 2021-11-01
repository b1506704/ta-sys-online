import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {
  DxButtonModule,
  DxFormModule,
  DxGalleryModule,
  DxPopupModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FormatCurrencyModule } from 'src/app/shared/pipes/formatCurrency.module';
import { GetDayOfWeekModule } from 'src/app/shared/pipes/getDayOfWeek.module';
@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    DxGalleryModule,
    DxButtonModule,
    DxPopupModule,
    FormatCurrencyModule,
    GetDayOfWeekModule,
    DxScrollViewModule,
    DxFormModule,
    DxButtonModule,
  ],
  declarations: [
    LandingPageComponent,
    InstructorDetailComponent,
    CourseDetailComponent,
  ],
})
export class LandingPageModule {}
