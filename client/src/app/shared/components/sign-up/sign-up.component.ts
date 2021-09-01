import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UserStore } from '../../services/user/user-store.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
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
  constructor(private authService: AuthService, private userStore: UserStore) {}

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

  roleDataListener() {
    this.userStore.$roleList.subscribe((data: any) => {
      this.roleList = data;
    });
  }

  ngOnInit(): void {
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
      username: '',
      password: '',
      roleId: this.roleList[0],
    };
  }
}
