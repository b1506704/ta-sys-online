import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxFormModule, DxSelectBoxModule } from 'devextreme-angular';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DxFormModule,
    UserProfileRoutingModule,
    DxSelectBoxModule,
  ],
  declarations: [UserProfileComponent],
})
export class UserProfileModule {}
