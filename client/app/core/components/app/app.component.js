import { Component, Inject } from '@angular/core'; // eslint-disable-line no-unused-vars

import { TranslateService } from 'ng2-translate/ng2-translate';
import { translation } from '../../../i18n/en';
import template from './app.template.html';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'my-app',
  directives: [ MenuComponent],
  template: template
})
export class AppComponent {

  constructor(@Inject('ENVIRONMENT') environment) {
    this.environment = environment;
  }

  ngOnInit() {
    console.log('aaa')
  }
}
