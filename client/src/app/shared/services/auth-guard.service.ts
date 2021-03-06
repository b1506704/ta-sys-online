import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserStore } from './user/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public userStoreService: UserStore, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.userStoreService.$isLoggedIn.subscribe((data: any) => {
      if (data !== true) {
        this.router.navigate(['/splash_screen']);
        this.userStoreService.setIsShowLoginPopup(true);
      }
    });
    return true;
  }
}
