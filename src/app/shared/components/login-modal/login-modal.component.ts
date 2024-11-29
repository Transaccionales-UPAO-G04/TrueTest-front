import { Component, Signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http'; // Agregado para enviar solicitudes HTTP

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  loginForm: FormGroup;

  // Inicializamos la señal de error
  showError: Signal<boolean>;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Usamos computed para evaluar la condición reactiva
    this.showError = computed(() => this.loginForm.invalid && this.loginForm.touched);
  }

  // Función para cerrar el modal
  closeModal() {
    console.log('Modal cerrado');
    // Aquí es donde manejas el cierre del modal
    // Si estás usando un servicio o un modal de Angular Material, deberías cerrar el modal aquí.
    // Ejemplo: this.dialogRef.close(); o emitir un evento si estás utilizando una lógica personalizada
  }

  // Función para enviar el formulario
  submitForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Formulario enviado', formData);

      // Realiza la solicitud HTTP (suponiendo que tienes una API)
      this.http.post('https://mi-api.com/login', formData).subscribe({
        next: (response) => {
          console.log('Respuesta de la API', response);
          // Aquí puedes manejar lo que ocurre después de una respuesta exitosa
          this.closeModal();  // Opcionalmente, cerrar el modal si la solicitud es exitosa
        },
        error: (error) => {
          console.error('Error de solicitud', error);
          // Aquí puedes manejar los errores de la solicitud (por ejemplo, mostrar un mensaje)
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Función para verificar si un control tiene un error específico
  controlHasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName);
    return control && control.hasError(errorName);
  }
}
