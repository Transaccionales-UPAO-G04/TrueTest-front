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

  navigateToUpdateProfile(): void {
    this.router.navigate(['/estudiante/perfil/actualizar']);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
