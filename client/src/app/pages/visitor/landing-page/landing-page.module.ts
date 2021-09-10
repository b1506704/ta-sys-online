import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { DxButtonModule, DxGalleryModule } from 'devextreme-angular';
@NgModule({
  imports: [CommonModule, LandingPageRoutingModule, DxGalleryModule, DxButtonModule],
  declarations: [LandingPageComponent],
})
export class LandingPageModule {}
