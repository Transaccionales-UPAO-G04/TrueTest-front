import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Variable para rastrear qué tarjeta está en hover
  hovered: string | null = null;

  // Método para cambiar el estado de hover
  hover(section: string | null): void {
    this.hovered = section; // Cambia el valor de hovered al nombre de la sección
  }


}
