import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { UserStore } from '../../services/user/user-store.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;
  password = '';
  passwordOptions: any = {
    mode: 'password',
    value: this.password,
  };
  user: User;
  roleList: Array<any> = [];
  roleSelectBoxOptions: any = {
    items: this.roleList,
    valueExpr: 'id',
    displayExpr: 'name',
    placeholder: 'Select role',
    onValueChanged: this.onRoleChange.bind(this),
  };
  isLearnerInfoVisible: boolean = false;
  checkBoxOptions: any;
  signupButtonOptions: any = {
    text: 'Signup',
    icon: 'export',
    type: 'normal',
    useSubmitBehavior: true,
  };
  loginButtonOptions: any = {
    text: 'To Login',
    icon: 'key',
    type: 'normal',
    useSubmitBehavior: false,
    onClick: this.navigateLogin.bind(this),
  };
  isLoading!: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: StoreService,
    private userStore: UserStore
  ) {}

  onFormShown(e: any) {
    setTimeout(() => {
      this.form.instance.getEditor('username').focus();
    }, 200);
  }

  onRoleChange(e: any) {
    this.user.roleId = e.value;
  }

  onSignupSubmit = (e: any) => {
    // console.log(this.user);
    e.preventDefault();
    this.authService.sendRegisterRequest(this.user);
  };

  navigateLogin() {
    this.router.navigate(['/login']);
  }

  roleDataListener() {
    this.userStore.$roleList.subscribe((data: any) => {
      this.roleList = data;
    });
  }

  isLoadingListener() {
    return this.store.$isLoading.subscribe((data: any) => {
      this.isLoading = data;
    });
  }

  ngOnInit(): void {
    this.isLoadingListener();
    this.userStore.getRole().then(() => {
      this.roleDataListener();
    });
    this.checkBoxOptions = {
      text: 'Additional Information',
      value: false,
      onValueChanged: (e: any) => {
        this.isLearnerInfoVisible = e.component.option('value');
      },
    };
    this.user = {
      id: undefined,
      username: '',
      password: '',
      displayName: '',
      roleId: this.roleList[0],
    };
  }
  ngOnDestroy(): void {
    this.isLoadingListener().unsubscribe();
  }
}
