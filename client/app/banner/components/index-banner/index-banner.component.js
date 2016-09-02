/**
 * Created by bby on 16/8/24.
 */
import { Component, ChangeDetectionStrategy, Input, DomSanitizationService } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './index-banner.template.html';
import { ShortDescriptionPipe } from '../../../pipes/short-description.pipe';

@Component({
  selector: 'index-banner',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ROUTER_DIRECTIVES],
  pipes: [ShortDescriptionPipe]
})

export class IndexBannerComponent {
  @Input() indexBanner;

}