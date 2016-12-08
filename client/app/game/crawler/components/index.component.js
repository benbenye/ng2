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
    this._cap = [];
  }
  onStart(option) {
    this._service.getHtml().subscribe(ee=>{
      if(ee.success) this._cap = ee.arr.reverse();
    })
  }
}