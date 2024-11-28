import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {PasswordResetComponent} from "./password-reset/password-reset.component";

export const authRoutes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},

    {
        path: '',
        component: AuthLayoutComponent,

        children: [
            {path: 'login', component:LoginComponent},
            {path: 'register', component:RegisterComponent},
            {path: 'password-reset', component: PasswordResetComponent}
        ]
    }
];
