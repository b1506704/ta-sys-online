import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  password = '';
  passwordOptions: any = {
    mode: 'password',
    value: this.password,
  };
  user: {
    username: '';
    password: '';
  };
  loginButtonOptions: any = {
    text: 'Login',
    icon: 'key',
    type: 'normal',
    useSubmitBehavior: true,
  };
  signupButtonOptions: any = {
    text: 'To Signup',
    icon: 'export',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: this.navigateSignup.bind(this),
  };
  isLoading!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: StoreService
  ) {}

  passwordComparison = () => {
    return this.form.instance.option('formData').Password;
  };

  checkComparison() {
    return true;
  }
  onFormShown(e: any) {
    setTimeout(() => {
      this.form.instance.getEditor('username').focus();
    }, 200);
  }
  onLoginSubmit = (e: any) => {
    e.preventDefault();
    this.authService.sendLoginRequest(this.user);
  };
  navigateSignup() {
    this.router.navigate(['/signup']);
  }
  ngAfterViewInit() {
    // confirm(
    //   '<div>username: d123</div><div>password: d123</div><div>role: Instructor</div><div>username: admin</div><div>password: admin</div><div>role: Admin</div><div>username: c123</div><div>password: c123</div><div>role: Learner</div>',
    //   'Test Account'
    // );
  }

  isLoadingListener() {
    return this.store.$isLoading.subscribe((data: any) => {
      this.isLoading = data;
    });
  }
  ngOnInit(): void {
    this.isLoadingListener();
    this.user = {
      username: '',
      password: '',
    };
  }
  ngOnDestroy(): void {
    this.isLoadingListener().unsubscribe();
  }
}
