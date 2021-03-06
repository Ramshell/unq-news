import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import PostService from "../services/post.service";

@Component({
  selector: 'newComment',
  inputs: [ 'dataPost' ],
  template: `<form>
                <input [(ngModel)]="data.author" placeholder="Author" name="author">
                <textarea [(ngModel)]="data.body" placeholder="Comment" name="comment"></textarea>
                <button type="button" (click)="create_comment()">Comentar</button>
             <form>`
})
export default class NewCommentComponent {
  constructor(route, postService) {
    this.data = {}
    this.route = route
    this.postService = postService
  }

  ngOnInit() {
    this.dataPost = {}
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  create_comment() {
    this.postService.createComment(this.dataPost, this.data)
    this.data = {}
  }
}

NewCommentComponent.parameters = [
  ActivatedRoute, PostService
]
