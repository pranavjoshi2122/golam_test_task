import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subscriber } from 'rxjs';
import { post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent {
posts:post[]=[]
private postSub:Subscription;

  constructor(public ps:PostsService){

  }
  // posts=[
  //   {title:'Angular tutorial',content:'this is Angular proj'},
  //   {title:'Angularr tutorial',content:'this is Angular proj'},
  //   {title:'Angula tutorial',content:'this is Angular proj'},
  // ]

  ngOnInit(){
    this.posts=this.ps.getAll()
    this.postSub=this.ps.getUpdateListener().subscribe((posts:post[])=>{
      this.posts=posts
    })
  }
  ngOnDestroy(){
    this.postSub.unsubscribe()
  }
  onDelete(data){
    this.ps.DeletePost(data)
  }
}
