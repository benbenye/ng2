/**
 * Created by bby on 16/8/15.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './index-index.template_m.html';
import { UserService } from '../../../auth';
import { IndexService } from '../../services/index/index.service_m';
import { IndexLcListComponent } from '../index-lc-list/index-lc-list.component_m';
import { IndexBannerComponent } from '../../../banner/components/index-banner/index-banner.component_m';

@Component({
  selector: 'index',
  template: template,
  directives: [ROUTER_DIRECTIVES, IndexLcListComponent, IndexBannerComponent],
  changeDetection: ChangeDetectionStrategy.Detached,
  styles: [require('./w.css')]
})
export class IndexComponent {
  constructor(userService: UserService, indexService: IndexService) {
    this.userService = userService;
    this._indexService = indexService;
  }


  ngOnInit() {
    this._indexService.refreshIndex();
  }

  getRemoteLc() {
    return this._indexService.remoteLc;
  }
  getRmoteFoucs(){
    return this._indexService.remoteFocus;
  }
}
