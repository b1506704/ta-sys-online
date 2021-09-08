import {
  Component,
  NgModule,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { DxLoadIndicatorModule } from 'devextreme-angular';
import { StoreService } from '../../services/store.service';
import { UserStore } from '../../services/user/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  userMenuItems = [
    {
      text: 'Profile',
      icon: 'user',
      onClick: () => {
        this.router.navigate(['/profile']);
      },
    },
  ];

  isLoadIndicatorVisible!: boolean;
  isLoggedIn!: boolean;
  isRoleSelected: boolean = false;

  constructor(
    private router: Router,
    private store: StoreService,
    private userStore: UserStore
  ) {}

  roleNameListener() {
    return this.store.$currentRoleName.subscribe((data: any) => {
      if (data === undefined) {
        this.isRoleSelected = false;
      } else {
        this.isRoleSelected = true;
      }
    });
  }

  isLoadingListener() {
    return this.store.$isLoading.subscribe((data: any) => {
      this.isLoadIndicatorVisible = data;
    });
  }

  isLoginListener() {
    return this.userStore.$isLoggedIn.subscribe((data: any) => {
      this.isLoggedIn = data;
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  onLogout() {
    this.userStore.logoutUser();
  }

  navigateHome() {
    this.router.navigate(['/splash_screen']);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };

  ngOnInit() {
    this.isLoadingListener();
    this.isLoginListener();
    this.roleNameListener();
  }

  ngOnDestroy() {
    this.isLoadingListener().unsubscribe();
    this.isLoginListener().unsubscribe();
    this.roleNameListener().unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxLoadIndicatorModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
