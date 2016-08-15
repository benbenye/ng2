import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RequestService } from '../../../auth';

@Injectable()
export class PostService {
  remotePosts = new BehaviorSubject([]);

  constructor(http: Http, request: RequestService) {
    this._http = http;
    this._request = request;
  }

  refreshPosts() {
    let postsResponse = this._http.get('/CmsHome/getHomeData/site_id/1')
      .map(res => {
        let lcObj = res.json().lc;
        return Object.keys(lcObj).sort((a,b)=>b-a).map(e => {
          return lcObj[e]
      })
      });

    postsResponse.subscribe(
        (posts) => {
          this.remotePosts.next(posts);
        },
        (error) => {
          console.error(error);
        }
      );
    return postsResponse;
  }

  addPost(post) {
    return this._http
      .post('/index', JSON.stringify(post), { headers: this._request.getAuthHeaders() })
      .map(res => res.json());
  }

  getPost(id) {
    return this._http.get(`/post/${id}`)
      .map(res => res.json());
  }

  updatePost(post) {
    return this._http
      .post(`/post/${post._id}`, JSON.stringify(post), { headers: this._request.getAuthHeaders() })
      .map(res => res.json());
  }
}
