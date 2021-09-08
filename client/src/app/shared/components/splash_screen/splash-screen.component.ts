import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStore } from '../../services/user/user-store.service';
@Component({
  selector: 'app-splash-screen',
  templateUrl: 'splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  date: Date = new Date();
  timeout: any;
  constructor(private userStore: UserStore) {}

  preLoading() {
    this.timeout = setTimeout(() => {
      this.userStore.dynamicRouting();
    }, 1500);
  }

  ngOnInit(): void {
    this.preLoading();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
}
