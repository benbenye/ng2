import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './address-manage-template.html';
import { UserService } from '../../../auth';
import { MenuTitleComponent } from '../../../core/components/menu/menu-title.component_m';

@Component({
  selector: 'address-manage',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.Detached,
  styleUrls:['http://127.0.0.1:3000/css/m/order.css','http://127.0.0.1:3000/m/0.1.0/css/main.css']
})

export class AddressManageComponent {

}