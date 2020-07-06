import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentsComponent } from './comments/comments.component';
import { HttpErrorHandler } from './http-error-handler.sevice';
import { MessageService } from './message.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { TreatedDemandsComponent } from './treated-demands/treated-demands.component';
import { NotTreatedDemandsComponent } from './not-treated-demands/not-treated-demands.component';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    CommentsComponent,
    NavbarComponent,
    UsersComponent,
    DashboardComponent,
    RegisterComponent,
    AlertComponent,
    TreatedDemandsComponent,
    NotTreatedDemandsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [
    MessageService, HttpErrorHandler,FormBuilder,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],  
  bootstrap: [AppComponent]
})
export class AppModule { }
