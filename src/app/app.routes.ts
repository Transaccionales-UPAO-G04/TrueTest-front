import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Cambia la redirección a Home

  {
    path: 'home',
    loadChildren: () =>
      import('./page/home/home.routes').then((h) => h.homeRoutes),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./page/auth/auth.routes').then((a) => a.authRoutes),
    canActivate: [authInverseGuard],
  },

  {
    path: 'estudiante',
    loadChildren: () =>
      import('./page/estudiante/estudiante.routes').then((e) => e.estudianteRoutes),
    canActivate: [authGuard],
  },

  {
    path: 'mentor',
    loadChildren: () =>
      import('./page/mentor/mentor.routes').then((m) => m.mentorRoutes),
    canActivate: [authGuard],
  },
];
