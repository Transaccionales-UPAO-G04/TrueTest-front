import { Component, inject, OnInit } from '@angular/core';
import { PerfilUsuarioService } from '../../../core/services/perfil-usuario.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioPerfil } from '../../models/usuario-perfil.model';
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


  private userProfileService = inject(PerfilUsuarioService);
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
