import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},

    {
        path: '',
        component: AuthLayoutComponent,

        children: [
            {path: 'login', component:LoginComponent},
            {path: 'register', component:RegisterComponent}
        ]
    }
];
