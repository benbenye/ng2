/**
 * Created by bby on 16/8/15.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './index-index.template.html';
import { UserService } from '../../../auth';
import { IndexService } from '../../services/index/index.service';
import { IndexLcListComponent } from '../index-lc-list/index-lc-list.component';

@Component({
  selector: 'index',
  template: template,
  directives: [ROUTER_DIRECTIVES, IndexLcListComponent],
  changeDetection: ChangeDetectionStrategy.Detached
})
export class IndexComponent {
  constructor(userService: UserService, indexService: IndexService) {
    this.userService = userService;
    this._indexService = indexService;
  }


  ngOnInit() {
    this._indexService.refreshIndex();
  }

  getRemoteIndex() {
    return this._postService.remoteIndex;
  }
}
