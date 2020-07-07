import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'home', 
    loadChildren: './home/home.module#HomePageModule', 
    canActivate: [AuthGuard] 
  },
  {
    path: 'fiche',
    loadChildren: () => import('./pages/fiche/fiche.module').then( m => m.FichePageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'infos',
    loadChildren: () => import('./pages/infos/infos.module').then( m => m.InfosPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'result',
    loadChildren: () => import('./pages/result/result.module').then( m => m.ResultPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'carte',
    loadChildren: () => import('./pages/carte/carte.module').then( m => m.CartePageModule),
    canActivate: [AuthGuard] 
  },
  // { path: 'list', 
  // loadChildren: './list/list.module#ListPageModule', 
  // canActivate: [AuthGuard] 
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
