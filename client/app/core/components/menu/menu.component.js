import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import template from './menu.template.html';
import { UserService } from '../../../auth';
import { CategoryListComponent } from '../../../category/components/category-list.component';

@Component({
  selector: 'top-menu',
  template: template,
  directives: [ CategoryListComponent],
  styleUrls:['http://127.0.0.1:3000/css/index.css']
})
export class MenuComponent {
  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this._router = router;
  }
  ngOnInit() {
    console.log('ddd')
  }
  getLoggedIn() {
    return this.userService.getLoggedIn();
  }

  logout() {
    this.userService.logout();
    this._router.navigate(['']);
    return false;
  }
}
