import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from './postlist/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
constructor(private postService:PostsService){

}


  onPostData(form:NgForm){
    this.postService.addPost(form.value.title,form.value.content,form.value.dateTime)
    form.resetForm()
  }
}
