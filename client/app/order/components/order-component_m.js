/**
 * Created by bby on 16/8/15.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './order-template_m.html';
import { UserService } from '../../auth';

@Component({
  selector: 'order-settlement',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.Detached,
  styleUrls:['static/css/m/order.css']
})
export class OrderComponent {
  constructor(userService: UserService) {
    this.userService = userService;
  }


  ngOnInit() {
  }

}
