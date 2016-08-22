import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RequestService } from '../../../auth';

@Injectable()
export class IndexService {
  remoteFocus = new BehaviorSubject([]);
  remoteLc = new BehaviorSubject([]);
  remoteCookbook = new BehaviorSubject([]);
  remoteChunboNow = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshIndex() {
    let indexResponse = this._http.get('/CmsHome/getHomeData/site_id/1')
      .map(res => {
        let lcObj = [];
        let cookbook = [];
        lcObj = Object.keys(res.json().lc).sort((a,b)=>b-a).map(e => {
          return res.json().lc[e]
        });
        cookbook = Object.keys(res.json().cookbook).sort((a,b)=>b-a).map(e => {
          return res.json().cookbook[e]
        });
        return {
          cookbook:cookbook,
          lc:lcObj,
          chunbo_now:res.json().chunbo_now,
          focus:res.json().focus
        }
      });

    indexResponse.subscribe(
        (index) => {
          this.remoteFocus.next(index.focus);
          this.remoteLc.next(index.lc);
          this.remoteCookbook.next(index.cookbook);
          this.remoteChunboNow.next(index.chunbo_now);
        },
        (error) => {
          console.error(error);
        }
      );
    return indexResponse;
  }
}
