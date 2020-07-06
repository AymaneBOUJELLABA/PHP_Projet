import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { Comment } from './comments/comments';
import { HttpErrorHandler , HandleError } from './http-error-handler.sevice';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private handleError: HandleError;
  
  
  constructor(private http:HttpClient , httpErrorHandler:HttpErrorHandler)
  {
    this.handleError = httpErrorHandler.createHandleError('CommentsService')
  }

  getComments(): Observable<Comment[]>
  {
    return this.http
      .get<Comment[]>('api/comments')
      .pipe(catchError(this.handleError('getComments', [])))
  }

  
  addComment(comment: Comment): Observable<Comment>
  {
    return this.http
      .post<Comment>('api/comment', comment)
      .pipe(catchError(this.handleError('addComment',comment)))
  }
  
  deleteComment(id : number): Observable<{}>
  {
    const url=`api/comment/${id}`;
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError('deleteComment')))
  }

  updateComment(comment: Comment): Observable<Comment>
  {
    return this.http
      .put<Comment>(`api/comment/${comment.id}`,comment)
      .pipe(catchError(this.handleError('updateComment',comment)))
  }
}
