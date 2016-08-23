/**
 * Created by bby on 16/8/23.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RequestService } from '../../auth';

@Injectable()
export class CategoryListService {
  remoteCategoryList = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshIndex() {
    let categoryListResponse = this._http.get('/Category/getCatList')
      .map(res => res.json().data);

    categoryListResponse.subscribe(
      (data) => {
        this.remoteCategoryList.next(data);
      },
      (error) => {
        console.error(error);
      }
    );
    return categoryListResponse;
  }
}
