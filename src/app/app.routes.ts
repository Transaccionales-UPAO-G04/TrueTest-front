import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},

    {
        path: 'auth',
        loadChildren: () =>
            import('./page/auth/auth.routes').then((a) => a.authRoutes),
        canActivate:[authInverseGuard]
    },

    {
        path: 'estudiante',
        loadChildren: () =>
            import('./page/estudiante/estudiante.routes').then((e) => e.estudianteRoutes),
        canActivate:[authGuard]
    },
    
];
