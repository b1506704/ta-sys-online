import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { DxFormModule, DxSelectBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [CommonModule, SignUpRoutingModule, DxFormModule, DxSelectBoxModule],
  declarations: [SignUpComponent],
})
export class SignUpModule {}
