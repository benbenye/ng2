import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RequestService } from '../../../auth';

@Injectable()
export class IndexService {
  remoteIndex = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshIndex() {
    let indexResponse = this._http.get('/CmsHome/getHomeData/site_id/1')
      .map(res => {
        let lcObj = res.json().lc;
        return Object.keys(lcObj).sort((a,b)=>b-a).map(e => {
          return lcObj[e]
      })
      });

    indexResponse.subscribe(
        (posts) => {
          this.remoteIndex.next(posts);
        },
        (error) => {
          console.error(error);
        }
      );
    return indexResponse;
  }
}
