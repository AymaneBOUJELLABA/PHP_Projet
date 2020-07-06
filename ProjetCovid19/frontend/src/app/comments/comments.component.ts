import { Component, OnInit } from '@angular/core';

import { Comment } from './comments';
import { CommentsService } from './../comments.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  Comments : Comment[];
  editComment : Comment;


  constructor(private commentService:CommentsService) 
  {

  }

  ngOnInit(): void
  {
    this.getComments();
  }

  getComments():void
  {
    this.commentService.getComments().subscribe(Comments => (this.Comments = Comments));
  }

  add(author:string, text:string)
  {
    this.editComment = undefined;
    author = author.trim();
    text = author.trim();
    if(!author || !text)
    {
      return;
    }

    const newComment : Comment = { author:author, text:text } as Comment;

    this.commentService.addComment(newComment).subscribe(comment => this.Comments.push(comment));
  }

  delete(comment:Comment) :void
  {
    this.Comments = this.Comments.filter(h=> h!==comment);
    this.commentService.deleteComment(comment.id).subscribe();
  }
  

  edit(comment:Comment)
  {
    this.editComment = comment;
  }

  update()
  {
    if(this.editComment)
    {
      this.commentService.updateComment(this.editComment).subscribe(comment =>{
        const ix = comment ? this.Comments.findIndex(h => h.id= comment.id) : -1;
        if(ix > -1)
        {
          this.Comments[ix] = comment
        }
      })

      this.editComment = undefined;
    }
  }

}
