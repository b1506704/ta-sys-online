import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';
import { SplashScreenRoutingModule } from './splash-screen-routing.module';
import { DxLoadIndicatorModule } from 'devextreme-angular';

@NgModule({
  imports: [CommonModule, SplashScreenRoutingModule, DxLoadIndicatorModule],
  declarations: [SplashScreenComponent],
})
export class SplashScreenModule {}
