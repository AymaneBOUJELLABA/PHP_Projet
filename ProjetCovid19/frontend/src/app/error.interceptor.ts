import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor 
{
    constructor(private accountService: UsersService,
                private router:Router,
                private alertService: AlertService,
                ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => 
            {
            if (err.status == 401) {
                console.log("YOU SHALL NOT PASS!!");
                // auto logout if 401 response returned from api
                this.alertService.error(err.message);
                this.accountService.logout();
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}