import { DashboardComponent } from './dashboard/dashboard.component';
import { NotTreatedDemandsComponent } from './not-treated-demands/not-treated-demands.component';
import { TreatedDemandsComponent } from './treated-demands/treated-demands.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';


const routes: Routes = [

  { path: 'Login', component: UsersComponent},
  { path: 'Register', component: RegisterComponent},

  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '' , component: DashboardComponent, canActivate: [AuthGuard]},
  
  { path: 'Demandes/not-treated', component: NotTreatedDemandsComponent, canActivate:[AuthGuard]},
  { path: 'Demandes/treated', component: TreatedDemandsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
