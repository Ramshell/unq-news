import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'; import 'rxjs/add/operator/toPromise'
import { RouterModule }  from '@angular/router';

let router = RouterModule.forRoot([
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: PostListComponent },
  { path: 'news/:id', component: PostDetailComponent }
], { useHash: true })

import AppComponent from './app/components/app.component'
import PostComponent from './app/components/post.component'
import NewPostComponent from './app/components/newPost.component'
import PostDetailComponent from './app/components/postDetail.component'
import PostListComponent from './app/components/postList.component'
import CommentComponent from './app/components/comment.component'
import NewCommentComponent from './app/components/newComment.component'

@NgModule({
  imports: [ router, BrowserModule, FormsModule, HttpModule ],
  styleUrls: ['./style.css'],
  declarations: [
    AppComponent,
    PostComponent,
    NewPostComponent,
    PostDetailComponent,
    PostListComponent,
    CommentComponent,
    NewCommentComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
