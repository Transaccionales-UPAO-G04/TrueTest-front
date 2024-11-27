import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {UsuarioPerfil} from "../../../../shared/models/user-profile.model";
import {EstudianteMentorService} from "../../../../core/services/estudiante-mentor.service";
import {Mentor} from "../../../../shared/models/estudiante-mentor.model";
import {ActivatedRoute} from "@angular/router";
import {Reseña} from "../../../../shared/models/reseña.request.model";


@Component({
  selector: 'app-ver-perfil-mentor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-perfil-mentor.component.html',
  styleUrl: './ver-perfil-mentor.component.css'
})
export class VerPerfilMentorComponent implements OnInit {
  profile!: UsuarioPerfil;

  mentor: Mentor | null = null;  // Objeto para almacenar los detalles del mentor
  reviews: Reseña[] =[];

  constructor(
    private route: ActivatedRoute,
    private mentorService: EstudianteMentorService
  ) {}

  ngOnInit(): void {
    const mentorId = this.route.snapshot.paramMap.get('id');  // Obtener el id del mentor de la URL
    if (mentorId) {
      this.loadMentorProfile(Number(mentorId));  // Cargar los detalles del mentor
      this.loadMentorReviews(Number(mentorId));
    }
  }

  // Método para cargar los detalles del mentor
  loadMentorProfile(mentorId: number): void {
    this.mentorService.getMentorById(mentorId).subscribe({
      next: (mentor: Mentor) => {
        this.mentor = mentor;  // Asignar los detalles del mentor al modelo
      },
      error: (error) => {
        console.error('Error al cargar el perfil del mentor', error);
      }
    });
  }
  // Cargar las reseñas del mentor
  loadMentorReviews(mentorId: number): void {
    this.mentorService.getReseñasByMentorId(mentorId).subscribe(
      (reviews) => {
        this.reviews = reviews;
      },
      (error) => {
        console.error('Error al cargar las reseñas del mentor', error);
      }
    );
  }
}


