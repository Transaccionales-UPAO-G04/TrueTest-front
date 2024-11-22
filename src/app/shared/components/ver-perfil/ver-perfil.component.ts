import { Component, inject, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioPerfil } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';
import { PhotoSelectorComponent } from '../../modals/photo-selector/photo-selector.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.css'
})
export class VerPerfilComponent implements OnInit {
  profile!: UsuarioPerfil;
  //operador de asercion de no nulo.
  //en resumen, ! le dice al compilador que ignore las posibles verificaciones de null o undefined


  private userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar); // inyectar matsnackbar
  private dialog = inject(MatDialog);

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
    }else{
      this.showSnackBar('Error al cargar el perfil');
      this.router.navigate(['/auth/login']);
    }
  }

  openPhotoSelector(): void {
    const dialogRef = this.dialog.open(PhotoSelectorComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((selectedPhoto) => {
      if (selectedPhoto) {
        this.userProfileService
          .updateProfilePhoto(this.profile.id, selectedPhoto)
          .subscribe({
            next: () => {
              this.profile.photo = selectedPhoto; // Actualiza el modelo del perfil
              this.showSnackBar('Foto de perfil actualizada correctamente');
            },
            error: () => {
              this.showSnackBar('Error al actualizar la foto de perfil');
            },
          });
      }
    });
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
