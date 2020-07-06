import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

import { User, ConnectedUser, LoginUser, RegisterUser } from './users/users';
import { HttpErrorHandler , HandleError } from './http-error-handler.sevice';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private handleError: HandleError;
  private token = null;
  private httpOptions  = {
    headers: new HttpHeaders({
      'Accept':  'application/json',
     'responseType': "json"
    })
  }
  private userSubject: BehaviorSubject<ConnectedUser>;
  public user: Observable<ConnectedUser>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private httpErrorHandler : HttpErrorHandler,
    ) {
        this.userSubject = new BehaviorSubject<ConnectedUser>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        this.handleError = httpErrorHandler.createHandleError('UsersService');
    }


  setToken(token)
  {
    this.token = token;

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : token
      })
    }
  }
  getUsers(): Observable<User[]>
  {
    return this.http
      .get<User[]>('api/users', this.httpOptions)
      .pipe(catchError(this.handleError('getUsers',[])));
  }
  public get userValue(): ConnectedUser
  {
    return this.userSubject.value;
  }
  getCurrentUser()
  {
    return this.http
      .get<User>('api/user', this.httpOptions)
      .pipe(catchError(this.handleError('getCurrentUser',)));
  }
  login(email, password)
  {
    let device_name = "web";
    
    return this.http.post<ConnectedUser>(`api/user/login`, { email, password, device_name } )
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }
  logout()
  {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/Login']);
    return this.http
      .post('api/user/logout',[],this.httpOptions)
      .pipe(catchError(this.handleError('LogoutUser')));
  }
  RegisterAdmin(user: RegisterUser): Observable<RegisterUser>
  {    
    return this.http
      .post<RegisterUser>('api/admin/register', user)
      .pipe(catchError(this.handleError('RegisterAdmin',user)))
  }
  
  deleteUser(id : number): Observable<{}>
  {
    const url=`api/user/delete/${id}`;
    return this.http
      .delete(url,this.httpOptions)
      .pipe(catchError(this.handleError('deleteUser')))
  }

  updateUser(user: User): Observable<User>
  {
    return this.http
      .put<User>(`api/user/update/${user.id}`,user, this.httpOptions)
      .pipe(catchError(this.handleError('updateUser',user)))
  }
}
