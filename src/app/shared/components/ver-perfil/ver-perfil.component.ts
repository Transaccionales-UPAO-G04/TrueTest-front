import { Component, inject, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioPerfil } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
  profile!: UsuarioPerfil;
  photoModalOpen = false; // Para controlar la apertura del modal
  availablePhotos = [
    'perfiles/profile1.png',
    'perfiles/profile2.png',
    'perfiles/profile3.png',
    'perfiles/profile4.png',
    'perfiles/profile5.png',
    'perfiles/profile6.png',
  ];

  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.showSnackBar('Perfil cargado con éxito');
        },
        error: (error) => {
          this.showSnackBar('Error al cargar el perfil');
        }
      });
    } else {
      this.showSnackBar('Error al cargar el perfil');
      this.router.navigate(['/auth/login']);
    }
  }

  // Abre el modal de selección de foto
  openPhotoSelection(): void {
    this.photoModalOpen = true;
  }

  // Cierra el modal
  closePhotoSelection(): void {
    this.photoModalOpen = false;
  }

  // Cambia la foto de perfil
  selectPhoto(photo: string): void {
    this.profile.fotoPerfil = photo; // Aquí se guarda la ruta de la imagen seleccionada
    this.closePhotoSelection(); // Cierra el modal después de seleccionar la foto
    this.saveProfile(); // Guardamos el perfil actualizado
  }

  // Función para guardar el perfil actualizado (puedes implementarla según tu backend)
  saveProfile(): void {
    const authData = this.authService.getUser();
    const userId = authData?.id;

    if (userId) {
      this.userProfileService.updateProfilePhoto(userId, this.profile.fotoPerfil).subscribe({
        next: () => {
          this.showSnackBar('Foto de perfil actualizada');
        },
        error: (error) => {
          this.showSnackBar('Error al actualizar la foto de perfil');
        }
      });
    }
  }

  navigateToUpdateProfile(): void {
    this.router.navigate(['/estudiante/perfil/actualizar']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
