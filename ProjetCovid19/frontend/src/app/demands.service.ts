import { ConnectedUser } from './users/users';
import { UsersService } from './users.service';
import { catchError, tap, first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { demand, GraphData } from './treated-demands/demands';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorHandler, HandleError } from './http-error-handler.sevice';

@Injectable({
  providedIn: 'root'
})
export class DemandsService {

  private handleError: HandleError;
  private httpOptions;
  private currentUser : ConnectedUser;

  private graphData : GraphData;

  constructor(
    private router: Router,
    private http: HttpClient,
    private httpErrorHandler : HttpErrorHandler,
    private usersService : UsersService,

){
  this.handleError = httpErrorHandler.createHandleError('DemandsService');
  this.currentUser = this.usersService.userValue;
  console.log(this.currentUser.token);

  this.httpOptions= {
    headers: new HttpHeaders({
      'Accept':  'application/json',
      'responseType': "json",
      'Authorization' : `Bearer ${this.currentUser.token}`
    })
  }
  
 }

  getTreatedDemands()
  {
    return this.http.get<demand[]>(`api/questions/treated`);
  }
  getNotTreatedDemands()
  {
    return this.http.get<demand[]>(`api/questions/not-treated`);
  }
  updateDemand(demand: demand): Observable<demand>
  {
    console.log(demand);
    return this.http
      .put<demand>(`api/question/${demand.user_id}`,demand)
      .pipe(catchError(this.handleError('updateDemand',demand)))
  }
  
  getGraphs() 
  {
    return this.http.get<GraphData>('/api/questions/graphs',{ headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      tap(
        data => {
         this.graphData = { notTreated : data['notTreated'],
                            negatif : data['negatif'],
                            positif : data['positif']
                          }
          console.log(this.graphData)
        },
        error => {
          console.log(error);
        })
    );
  }

  getGraphData()
  {
    return this.graphData;
  }
}
