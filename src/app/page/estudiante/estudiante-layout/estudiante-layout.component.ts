import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { MentoresComponent } from '../mentores/mentores.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { AuthService} from "../../../core/services/auth.service";
import { UserProfileService} from "../../../core/services/user-profile.service";
import {UsuarioPerfil} from "../../../shared/models/user-profile.model";

@Component({
  selector: 'app-estudiante-layout',
  standalone: true,
  imports: [TestComponent, MentoresComponent, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './estudiante-layout.component.html',
  styleUrls: ['./estudiante-layout.component.css']
})
export class EstudianteLayoutComponent implements OnInit {
  userFotoUrl: string = '';  // Variable para almacenar la URL de la foto de perfil

  constructor(
    private router: Router,
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();  // Cargar perfil del usuario cuando el componente se inicializa
  }

  // Método para cargar el perfil del usuario
  loadUserProfile(): void {
    const authData = this.authService.getUser();  // Obtener los datos del usuario autenticado
    if (authData) {
      const userId = authData.id;
      // Llamar al servicio para obtener el perfil del usuario
      this.userProfileService.getUserProfile(userId).subscribe({
        next: (profile: UsuarioPerfil) => {
          this.userFotoUrl = this.userProfileService.getUserFoto(profile);  // Obtener la URL de la foto de perfil
        },
        error: (error) => {
          console.error('Error al cargar el perfil', error);
          // En caso de error, puedes manejarlo o poner una imagen por defecto
          this.userFotoUrl = 'profile/user.png';
        }
      });
    } else {
      console.error('Usuario no autenticado');
      this.userFotoUrl = 'profile/user.png';  // Foto predeterminada si no está autenticado
    }
  }

  // Método para navegar a diferentes rutas dentro del layout
  navigateTo(route: string): void {
    this.router.navigate([`/estudiante/${route}`]);
  }
}
