import { ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
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