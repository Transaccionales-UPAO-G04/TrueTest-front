import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';
import { MentoresComponent } from '../mentores/mentores.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-estudiante-layout',
  standalone: true,
  imports: [TestComponent, MentoresComponent, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './estudiante-layout.component.html',
  styleUrl: './estudiante-layout.component.css'
})
export class EstudianteLayoutComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([`/estudiante/${route}`]); // Agregar la ruta completa
  }
  
}
