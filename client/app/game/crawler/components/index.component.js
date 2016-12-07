/**
 * Created by bby on 16/8/24.
 */
import { Component, DomSanitizationService } from '@angular/core';
import { IndexService } from '../service/index.service';

import template from './index.template.html';
@Component({
  selector: 'game-crawler',
  template: template,
})

export class CrawlerComponent {
  constructor(_service: IndexService){
    this._service = _service;
  }
  onStart(option) {
    this._service.getHtml().subscribe(ee=>{
      console.log(ee)
    })
  }
}