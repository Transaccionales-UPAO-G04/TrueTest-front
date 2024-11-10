import { Component, inject } from '@angular/core';
import{ FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, 
    MatSnackBarModule, MatButtonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder)
  private router = inject(Router);
  private snackBar= inject(MatSnackBar);

  constructor(){
    this.loginForm = this.fb.group({
      email: ['correo prueba', [Validators.required, Validators.email]],
      password: ['contraseña prueba',[Validators.required]]
    });
  }

  controlHasError(control: string, error: string){
    return this.loginForm.controls[control].hasError(error);
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return;
    };

    this.showSnackBar("Inicio de sesion exitoso")
  }

  private showSnackBar(message:string): void{
    this.snackBar.open('Login Successful', 'Close', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
