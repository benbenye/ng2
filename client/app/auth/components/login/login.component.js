import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import template from './login.template.html';
import { UserService } from '../../services/user/user.service';
import { validatorFactory } from '../../../posts/validator';

@Component({
  selector: 'login',
  template: template,
})
export class LoginComponent {

  constructor(userService: UserService, builder: FormBuilder, router: Router) {
    this._userService = userService;
    this._router = router;
    this._loginWidthCode = true;
    this._loginWidthAccount = false;
    this._forgetPw = false;
    this.codeErrorCount = 0;

    this.loginForm = builder.group({
      email: ['', [Validators.required, validatorFactory('email')]],
      password: ['', Validators.required],
      verifyCode: ['', Validators.required]
    });
  }

  onSwitch(flag){
    switch (flag){
      case 'code':
        this._loginWidthAccount = false;
        this._loginWidthCode = true;
        this._forgetPw = false;
        break;
      case 'account':
        this._loginWidthAccount = true;
        this._loginWidthCode = false;
        this._forgetPw = false;
        break;
      case 'pw':
        this._loginWidthAccount = false;
        this._loginWidthCode = false;
        this._forgetPw = true;
        break;
      default:
        break;
    }
  }

  onSubmit(credentials) {
    this._userService.login(credentials).subscribe((result) => {
      if (result) {
        this._router.navigate(['']);
      }
    });
  }
}
