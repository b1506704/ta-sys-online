import { Injectable } from '@angular/core';
import { UserStore } from './user/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UserStore) {}
  sendLoginRequest(user: any) {
    this.userService.loginUser(user);
  }
  sendRegisterRequest(user: any) {
    this.userService.signupUser(user);
  }
}
