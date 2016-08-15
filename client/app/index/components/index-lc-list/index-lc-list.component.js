/**
 * Created by bby on 16/8/15.
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './index-lc-list.template.html';
import { ShortDescriptionPipe } from '../../../pipes/short-description.pipe';
import { UserService } from '../../../auth';

@Component({
  selector: 'index-lc-list',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES],
  pipes: [ShortDescriptionPipe]
})
export class IndexLcListComponent {
@Input() index;

  constructor(userService: UserService) {
    this.userService = userService;
  }

}
