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
import { DxLoadIndicatorModule, DxProgressBarModule } from 'devextreme-angular';
import { StoreService } from '../../services/store.service';
import { UserStore } from '../../services/user/user-store.service';
import { ScreenService } from '../../services/screen.service';

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

  isLoadIndicatorVisible: boolean = false;
  isLoggedIn!: boolean;
  isRoleSelected: boolean = false;
  eventType: string = '';
  progress!: number;
  maxValue: number = 100;
  responsiveWidth: any;

  constructor(
    private router: Router,
    private store: StoreService,
    private userStore: UserStore,
    private screenService: ScreenService
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

  responsiveAdapt() {
    const isXSmall = this.screenService.sizes['screen-x-small'];
    const isSmall = this.screenService.sizes['screen-small'];
    if (isXSmall === true) {
      this.responsiveWidth = 100;
    } else if (isSmall === true) {
      this.responsiveWidth = 120;
    } else {
      this.responsiveWidth = 300;
    }
  }

  responseProgressListener() {
    return this.store.$responseProgress.subscribe((data: any) => {
      if (data !== undefined && data !== NaN) {
        this.progress = data;
        console.log('RECEIVED PROGRESS');
        console.log(this.progress);
      }
    });
  }

  responseEventTypeListener() {
    return this.store.$responseEventType.subscribe((data: any) => {
      if (data !== undefined) {
        this.eventType = data;
        console.log('EVENT TYPE');
        console.log(this.eventType);
      }
    });
  }

  format(value: number) {
    return `Loading: ${(value * 100).toFixed(2)}%`;
  }

  isLoginListener() {
    return this.userStore.$isLoggedIn.subscribe((data: any) => {
      this.isLoggedIn = data;
    });
  }

  onLogin() {
    this.userStore.setIsShowLoginPopup(true);
  }

  onSignup() {
    this.userStore.setIsShowSignupPopup(true);
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
    this.responsiveAdapt();
    this.responseProgressListener();
    this.responseEventTypeListener();
    this.isLoadingListener();
    this.isLoginListener();
    this.roleNameListener();
  }

  ngOnDestroy() {
    this.isLoadingListener().unsubscribe();
    this.isLoginListener().unsubscribe();
    this.roleNameListener().unsubscribe();
    this.responseProgressListener().unsubscribe();
    this.responseEventTypeListener().unsubscribe();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxProgressBarModule,
    DxToolbarModule,
    DxLoadIndicatorModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
