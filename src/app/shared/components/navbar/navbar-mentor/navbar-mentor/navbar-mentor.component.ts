import { Component, inject, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar-mentor',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar-mentor.component.html',
  styleUrl: './navbar-mentor.component.css'
})
export class NavbarMentorComponent implements OnInit{
  private authService = inject(AuthService);
  private zone = inject(NgZone);
  private router = inject(Router);

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.zone.run(() => {
        this.isAuthenticated = authenticated; // Actualizar estado de autenticación
      });
    });
  }

  // Método de logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload(); // Recargar la página completamente
    });
  }
}