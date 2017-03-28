import { Component } from '@angular/core';
import PostService from "../services/post.service";

@Component({
  selector: 'comment',
  inputs: [ 'data' ],
  template: `
            <div class="comment">
              {{data.body}}
              <button type="button" (click)="upvote()">Vote</button>
              <footer>por {{data.author}} - Upvotes {{data.upvotes}}</footer>
            </div>`
})
export default class CommentComponent {

  constructor(postService) {
    this.postService = postService
  }

  upvote(){
    console.log(this.data)
    this.postService.upvoteComment(this.data)
  }
}

CommentComponent.parameters = [
  PostService
]
