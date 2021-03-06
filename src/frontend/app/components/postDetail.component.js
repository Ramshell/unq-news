import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import PostService from "../services/post.service"

@Component({
  selector: 'postDetail',
  inputs: [ 'post' ],
  template: `<post [data]="post"></post>

            <h2>Comentarios:</h2>
            <comment *ngFor="let comment of post.comments" [data]="comment"></comment>
            <newComment [dataPost]="post"></newComment>
            <button type="button" (click)="upvote()">Vote</button>
            <a [routerLink]="['/news']">Atras</a>`
})


export default class PostDetailComponent {

  constructor(route, postService) {
    this.route = route
    this.postService = postService
  }

  ngOnInit() {
    this.post = {}
    this.route.params.subscribe(params => {
      //cuando algo un parametro cambia
      this.postService.getPost(params.id)
          .then(post => this.post = post)
          .catch(e => console.log(e));
    });
  }

  upvote() {
    this.postService.upvote(this.post);
  }
}

PostDetailComponent.parameters = [
  ActivatedRoute, PostService
]
