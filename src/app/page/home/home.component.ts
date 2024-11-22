import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "../../core/services/auth.service"; // Servicio de autenticación
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Variable para rastrear qué tarjeta está en hover
  hovered: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // Método para cambiar el estado de hover
  hover(section: string | null): void {
    this.hovered = section; // Cambia el valor de hovered al nombre de la sección
  }

  // Método para manejar clics en las tarjetas
  navigateTo(route: string): void {
    if (this.authService.isAuthenticated()) {
      // Si está autenticado, navega a la ruta correspondiente
      this.router.navigate([route]);
    } else {
      // Si no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/auth/login']);
    }
  }
}
