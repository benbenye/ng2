/**
 * Created by bby on 16/12/6.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from '../../../auth/services//storage/storage.service';
import { RequestService } from '../../../auth/services/request/request.service';

@Injectable()
export class IndexService {

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  getHtml(credentials) {
    return this._http
      .get('/crawlers', JSON.stringify(credentials), { headers: this._request.getJsonHeaders() })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }
}

