import { Component, OnInit } from '@angular/core';
import { Mentor } from '../../../shared/models/estudiante-mentor.model';
import { EstudianteMentorService } from '../../../core/services/estudiante-mentor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mentores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentores.component.html',
  styleUrl: './mentores.component.css'
})
export class MentoresComponent implements OnInit {
  mentores: Mentor[] = [];  // Lista de mentores

  constructor(private mentorService: EstudianteMentorService) { }

  ngOnInit(): void {
    // Cargar los mentores al inicializar el componente
    this.loadMentores();
  }

  // Método para cargar los mentores desde el servicio
  loadMentores(): void {
    this.mentorService.getAllMentors().subscribe((mentores) => {
      this.mentores = mentores;
    });
  }

  // Método para manejar la acción de agendar un horario
  agendarHorario(mentorId: number): void {
    // Lógica para agendar un horario, puedes agregar un redireccionamiento o modal aquí
    console.log(`Agendar horario con el mentor ID: ${mentorId}`);
  }
}