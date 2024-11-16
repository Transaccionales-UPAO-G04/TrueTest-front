import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioPerfil } from '../../models/usuario-perfil.model';
import { PerfilUsuarioService } from '../../../core/services/perfil-usuario.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-actualizar-perfil',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './actualizar-perfil.component.html',
  styleUrl: './actualizar-perfil.component.css'
})
export class ActualizarPerfilComponent implements OnInit {
  profileForm: FormGroup;
  profile!: UsuarioPerfil;

  private fb = inject(FormBuilder);
  private userProfileService = inject(PerfilUsuarioService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.profileForm.patchValue(profile);
        },
        error: () => {
          this.showSnackBar('Error al cargar el perfil del usuario.');
        }
      });
    } else {
      this.showSnackBar('Usuario no autenticado.');
      this.router.navigate(['/auth/login']);
    }
  }

  controlHasError(controlName: string, errorName: string): boolean {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = { ...this.profile, ...this.profileForm.value };
      this.userProfileService.updateUserProfile(this.profile.id, updatedData).subscribe({
        next: () => {
          this.showSnackBar('Perfil actualizado exitosamente.');
          this.router.navigate(['/customer/profile']);
        },
        error: (error) => {
          this.showSnackBar(error.error?.message || 'Error al actualizar el perfil.');
        }
      });
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
