import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import template from './post-list.template.html';
import { UserService } from '../../../auth';
import { PostService } from '../../services/post/post.service';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import s from './post-list.component.css';

console.log(s, 'ssss')

@Component({
  selector: 'post-list',
  template: template,
  directives: [ROUTER_DIRECTIVES, PostListItemComponent],
  changeDetection: ChangeDetectionStrategy.Detached,
  // styleUrls: ['app/posts/components/post-list/post-list.template.css']
  styles: [require('./post-list.component.css')]
})

export class PostListComponent {
  constructor(postService: PostService, userService: UserService) {
    this._postService = postService;
    this.userService = userService;
  }


  ngOnInit() {
    this._postService.refreshPosts();
  }

  getRemoteIndex() {
    return this._postService.remotePosts;
  }
}
