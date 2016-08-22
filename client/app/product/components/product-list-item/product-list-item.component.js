/**
 * Created by bby on 16/8/15.
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './product-list-item.template.html';
import { ShortDescriptionPipe } from '../../../pipes/short-description.pipe';
import { UserService } from '../../../auth';

@Component({
  selector: 'product-list-item',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES],
  pipes: [ShortDescriptionPipe]
})
export class ProductListItemComponent {
@Input() item;

  constructor(userService: UserService) {
    this.userService = userService;
  }

}
/**
 * Created by bby on 16/8/18.
 */
