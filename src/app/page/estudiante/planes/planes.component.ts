import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';

interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
}

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements OnInit {
  planes: Plan[] = [
    {
      id: 1,
      nombre: 'Plan Básico',
      descripcion: 'Acceso a recursos y pruebas vocacionales esenciales.',
      precio: 'Gratis'
    },
    {
      id: 2,
      nombre: 'Plan Premium',
      descripcion: 'Acceso a todos los recursos, pruebas vocacionales avanzadas y soporte personalizado.',
      precio: '$29.99/mes'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes cargar los planes desde un servicio si es necesario
  }

  seleccionarPlan(plan: Plan): void {
    console.log(`Seleccionaste el ${plan.nombre}`);
    // Aquí puedes agregar lógica para manejar la selección del plan
  }
}
