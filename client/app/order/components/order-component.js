/**
 * Created by bby on 16/10/20.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './order-template.html';
import { UserService } from '../../auth';

@Component({
  selector: 'order',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.Detached,
  styleUrls:['http://127.0.0.1:3000/css/m/order.css','http://127.0.0.1:3000/m/0.1.0/css/main.css']
})
export class OrderComponent {
  constructor(userService: UserService) {
    this.userService = userService;
  }


  ngOnInit() {
  }

}
