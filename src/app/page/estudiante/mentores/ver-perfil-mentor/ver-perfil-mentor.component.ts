import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {UserProfileService} from "../../../../core/services/user-profile.service";
import { AuthService } from "../../../../core/services/auth.service";
import { EstudianteMentorService } from "../../../../core/services/estudiante-mentor.service";
import { ReseñaService } from "../../../../core/services/reseña.service";
import { Reseña } from "../../../../shared/models/reseña.response.model";
import { ReseñaDTO } from "../../../../shared/models/reseña.request.model";  // Asegúrate de que este DTO esté bien definido

@Component({
  selector: 'app-ver-perfil-mentor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ver-perfil-mentor.component.html',
  styleUrls: ['./ver-perfil-mentor.component.css']
})
export class VerPerfilMentorComponent implements OnInit {
  mentor: any;  // Objeto para almacenar los detalles del mentor
  reviews: Reseña[] = [];  // Reseñas del mentor
  reviewForm: FormGroup;  // Formulario de reseña
  idMentor: number = 0;  // Inicializa con un valor por defecto
  idEstudiante: number = 0;  // Inicializa con un valor por defecto

  constructor(
    private route: ActivatedRoute,
    private mentorService: EstudianteMentorService,
    private reseñaService: ReseñaService,
    private fb: FormBuilder,
    private authService: AuthService,
    private perfilUsuario: UserProfileService
  ) {
    // Inicializa el formulario de reseña en el constructor
    this.reviewForm = this.fb.group({
      texto: ['', Validators.required],
      calificacion: [null, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    // Obtener el id del mentor desde la URL
    this.idMentor = +this.route.snapshot.paramMap.get('id')!;

    // Obtener el ID del estudiante desde el UserProfileService
    const user = this.authService.getUser();
    if (user) {
      // Aquí obtenemos el ID de estudiante específico,
      // solo llamamos a la función si el usuario tiene el rol de estudiante
      this.perfilUsuario.getMentorOrStudentId(user.id).subscribe({
        next: (studentId) => {
          // Asignamos el ID del estudiante a la variable idEstudiante
          this.idEstudiante = studentId;
          console.log('ID Estudiante:', this.idEstudiante);
        },
        error: (err) => {
          console.error('Error al obtener ID Estudiante:', err);
        }
      });
    }

    // Cargar los detalles del mentor y las reseñas
    this.loadMentorProfile(this.idMentor);
    this.loadMentorReviews(this.idMentor);
  }

  // Cargar los detalles del mentor
  loadMentorProfile(mentorId: number): void {
    this.mentorService.getMentorById(mentorId).subscribe({
      next: (mentor) => {
        this.mentor = mentor;
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

  // Enviar reseña
  onSubmit(): void {
    if (this.reviewForm.invalid) {
      return;
    }

    const reseñaData: ReseñaDTO = this.reviewForm.value;

    // Llamar al servicio para crear la reseña
    this.reseñaService.crearReseña(this.idMentor, this.idEstudiante, reseñaData)
      .subscribe(
        (response) => {
          console.log('Reseña creada:', response);
          // Actualizar las reseñas después de crear una nueva
          this.loadMentorReviews(this.idMentor);
          // Limpiar el formulario
          this.reviewForm.reset();
        },
        (error) => {
          console.error('Error al crear reseña:', error);
        }
      );
  }

}
