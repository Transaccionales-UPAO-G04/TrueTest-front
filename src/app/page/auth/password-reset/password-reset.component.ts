import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from "../../../core/services/password-reset.service";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  // Aquí se garantiza que passwordForm esté inicializada en el constructor
  passwordForm: FormGroup;

  token: string = '';  // El token que vendrá en la URL
  isTokenValid: boolean = true;  // Para validar el token recibido en la URL
  isEmailSent: boolean = false; // Indica si se ha enviado el correo
  isEmailError: boolean = false; // Si hubo un error al enviar el correo
  isPasswordResetSuccess: boolean = false; // Si la contraseña se restableció correctamente
  isPasswordResetError: boolean = false; // Si hubo un error al restablecer la contraseña

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Inicializamos passwordForm directamente en el constructor
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Ejemplo de validación
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const token = params.get('token');  // Captura el token de la URL
      if (token) {
        this.token = token;
        // Aquí puedes agregar la lógica para validar el token (si lo deseas)
      }
    });
  }

  // Método para verificar el token (puedes agregar lógica de backend aquí si es necesario)
  verifyToken(token: string) {
    // Lógica para verificar el token (puedes hacer una llamada a la API de tu backend)
    // Si el token es válido, puedes continuar, sino marcarlo como inválido
  }

  // Método para enviar el correo de restablecimiento
  requestPasswordReset() {
    const email = this.passwordForm.get('email')?.value;
    this.passwordResetService.sendPasswordResetEmail(email).subscribe(
      response => {
        this.isEmailSent = true;
        this.isEmailError = false;
      },
      error => {
        this.isEmailSent = false;
        this.isEmailError = true;
      }
    );
  }

  // Método para restablecer la contraseña
  resetPassword() {
    const newPassword = this.passwordForm.get('password')?.value;
    this.passwordResetService.resetPassword(this.token, newPassword).subscribe(
      response => {
        this.isPasswordResetSuccess = true;
        this.isPasswordResetError = false;
      },
      error => {
        this.isPasswordResetSuccess = false;
        this.isPasswordResetError = true;
      }
    );
  }
}
