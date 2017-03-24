import { Component } from '@angular/core';

import PostService from '../services/post.service';

@Component({
  selector: 'postList',
  template: `<post *ngFor="let item of posts" [data]="item" [routerLink]="['/news', item._id]"></post>

            <newPost></newPost>`
})
export default class PostListComponent {
  constructor(postService) {
    this.posts = postService.posts;
  }
}

PostListComponent.parameters = [
  [PostService]
]
