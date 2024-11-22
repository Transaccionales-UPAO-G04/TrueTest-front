import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-mentor-layout',
  standalone: true,
  imports: [NavbarComponent, RouterModule, FooterComponent],
  templateUrl: './mentor-layout.component.html',
  styleUrl: './mentor-layout.component.css'
})
export class MentorLayoutComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/estudiante/${route}`]); // Agregar la ruta completa
  }
  
}
