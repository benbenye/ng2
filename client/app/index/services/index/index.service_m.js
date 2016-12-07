/**
 * Created by bby on 16/12/5.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RequestService } from '../../../auth';

@Injectable()
export class IndexService {
  remoteFocus = new BehaviorSubject([]);
  remoteLc = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshIndex() {
    console.log(this._request)
    let indexResponse = this._http.get('/CmsHome/getHomeData/site_id/1/type/2')
      .map(res => {
        let lcObj = [];
        lcObj = Object.keys(res.json().lc).sort((a,b)=>b-a).map(e => {
          return res.json().lc[e]
        });
        return {
          lc:lcObj,
          focus:res.json().focus
        }
      });

    indexResponse.subscribe(
      (index) => {
        this.remoteFocus.next(index.focus);
        this.remoteLc.next(index.lc);
      },
      (error) => {
        console.error(error);
      }
    );
    return indexResponse;
  }
}
