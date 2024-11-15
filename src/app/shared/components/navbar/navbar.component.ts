import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload(); // Forzar recarga completa de la página
    });
  }

} 
