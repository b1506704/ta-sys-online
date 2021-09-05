import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { UserStore } from '../../services/user/user-store.service';
@Component({
  selector: 'app-splash-screen',
  templateUrl: 'splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  date: Date = new Date();
  constructor(
    private router: Router,
    private store: StoreService,
    private userStore: UserStore
  ) {}

  preLoading() {
    this.userStore.dynamicRouting();
  }

  ngOnInit(): void {
    this.preLoading();
  }

  ngOnDestroy(): void {
    // this.preLoading().unsubscribe();
  }
}
