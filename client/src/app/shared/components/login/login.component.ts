import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  password = '';
  passwordOptions: any = {
    mode: 'password',
    value: this.password,
  };
  user: {
    username: '',
    password: ''
  };
  loginButtonOptions: any = {
    text: 'Login',
    type: 'normal',
    useSubmitBehavior: true,
  };
  resetButtonOptions: any = {
    text: 'Clear',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: () => {
      this.form.instance.resetValues();
      this.form.instance.getEditor('username').focus();
    },
  };
  constructor(private authService: AuthService) {}

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
    // console.log(this.user);
  };
  ngAfterViewInit() {
    // confirm(
    //   '<div>username: d123</div><div>password: d123</div><div>role: Instructor</div><div>username: admin</div><div>password: admin</div><div>role: Admin</div><div>username: c123</div><div>password: c123</div><div>role: Learner</div>',
    //   'Test Account'
    // );
  }
  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
  }
}
