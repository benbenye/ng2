import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './category-list.template.html';
import { UserService } from '../../auth';
import { CategoryListService } from '../services/category-list.service';

@Component({
  selector: 'category-list',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.Detached,
  // styleUrls:['client/app/index/components/index-index/w.css']
})
export class CategoryListComponent {
  constructor(userService: UserService, categoryListService: CategoryListService) {
    this.userService = userService;
    this._categoryListService = categoryListService;
  }

  ngOnInit() {
    this._categoryListService.refreshIndex();
  }

  getRemoteIndex() {
    return this._categoryListService.remoteCategoryList;
  }
}
