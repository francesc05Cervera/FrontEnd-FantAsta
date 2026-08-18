import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then((m) => m.Login) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then((m) => m.Register) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard) },
  { path: 'auctions/new', canActivate: [authGuard], loadComponent: () => import('./features/auctions/create-auction/create-auction').then((m) => m.CreateAuction) },
  { path: 'auctions/join', canActivate: [authGuard], loadComponent: () => import('./features/auctions/join-auction/join-auction').then((m) => m.JoinAuction) },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' }
];
