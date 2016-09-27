import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import template from './menu-title.template_m.html';
import { UserService } from '../../../auth';
import { CategoryListComponent } from '../../../category/components/category-list.component_m';

@Component({
  selector: 'top-menu-title',
  template: template,
  directives: [ CategoryListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTitleComponent {
  ngOnInit() {
    console.log('ddd')
  }

}
