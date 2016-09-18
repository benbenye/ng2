/**
 * Created by bby on 16/8/15.
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './product-list-item.template_m.html';
import { ShortDescriptionPipe } from '../../../pipes/short-description.pipe';

@Component({
  selector: 'product-list-item',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES],
  pipes: [ShortDescriptionPipe]
})
export class ProductListItemComponent {
@Input() item;
}
/**
 * Created by bby on 16/8/18.
 */
