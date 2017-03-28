import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class PostService {

  constructor(http) {
    this.http = http
    this._posts = []
    this.http.get("/news").toPromise()
            .then(response => this._posts.push(...response.json()))
            .catch(err => console.log(err))
  }

  get posts() {
    return this._posts
  }

  getPost(id) {
    return this.http.get(`/news/${id}`).toPromise()
            .then(response => response.json());
  }

  create(post) {
    this.http.post("/news", JSON.stringify(post), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => {
              return this.getPost(response.json())
            })
            .then(post => this.posts.push(post))
            .catch(err => console.log(err))
  }

  createComment(id, data, post){
    this.http.post(`/news/${id}/comments`, JSON.stringify(data), { headers:{'Content-Type': 'application/json'}})
            .toPromise()
            .then(response => {
              post.comments.push(data)
            })
            .catch(err => console.log(err))
  }

  upvote(post) {
    this.http.put(`/news/${post._id}/upvote`)
            .toPromise()
            .then(response => {
              post.upvotes++;
            })
            .catch(err => console.log(err))
  }

  upvoteComment(comment) {
    this.http.put(`/news/${comment.post}/comments/${comment._id}/upvote`)
            .toPromise()
            .then(response => {
              comment.upvotes++;
            })
            .catch(err => console.log(err))
  }
}

PostService.parameters = [
  Http
]
