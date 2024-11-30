import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileService } from "../../../../core/services/user-profile.service";
import { AuthService } from "../../../../core/services/auth.service";
import { EstudianteMentorService } from "../../../../core/services/estudiante-mentor.service";
import { ReseñaService } from "../../../../core/services/reseña.service";
import { Reseña } from "../../../../shared/models/reseña.response.model";
import { ReseñaDTO } from "../../../../shared/models/reseña.request.model";
import { HorarioService } from '../../../../core/services/horario.service';
import { Horario } from '../../../../shared/models/horario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  horarios: Horario[] = []; // Nueva variable para almacenar los horarios
  studentRegisteredToHorario: boolean[] = [];  // Array para saber si el estudiante está registrado a cada horario
  rating: number = 0; // Calificación del estudiante (1 a 5)
  stars: number[] = [1, 2, 3, 4, 5]; // Estrellas que se mostrarán

  private router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private mentorService: EstudianteMentorService,
    private reseñaService: ReseñaService,
    private horarioService: HorarioService,
    private fb: FormBuilder,
    private authService: AuthService,
    private perfilUsuario: UserProfileService,
    private snackBar: MatSnackBar
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
      this.perfilUsuario.getMentorOrStudentId(user.id).subscribe({
        next: (studentId) => {
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
    this.loadMentorHorarios(this.idMentor); // Cargar los horarios del mentor
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
    this.mentorService.getReseñasByMentorId(mentorId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        console.error('Error al cargar las reseñas del mentor', error);
      }
    });
  }

  // Cargar los horarios del mentor
  loadMentorHorarios(mentorId: number): void {
    this.horarioService.getHorarios(mentorId).subscribe({
      next: (horarios) => {
        this.horarios = horarios;
        this.studentRegisteredToHorario = new Array(horarios.length).fill(false); // Inicializa el array con 'false'
      },
      error: (error) => {
        console.error('Error al cargar los horarios del mentor', error);
      }
    });
  }
  
// Registrar al estudiante en un horario
registerStudent(horarioId: number | undefined): void {
  if (horarioId !== undefined) {
    this.horarioService.registerStudentToHorario(horarioId, this.idEstudiante).subscribe({
      next: (response) => {
        console.log('Estudiante registrado en el horario:', response);
        this.studentRegisteredToHorario[horarioId] = true;
        // Mostrar mensaje de éxito
        this.snackBar.open('¡Te has registrado correctamente al horario!', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (error) => {
        console.error('Error al registrar estudiante:', error);
        // Mostrar notificación de error
        this.snackBar.open('No se pudo completar el registro al horario. El horario debe estar ocupado o ya estas registrado.', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}

// Desregistrar al estudiante de un horario
unregisterStudent(horarioId: number | undefined): void {
  if (horarioId !== undefined) {
    this.horarioService.unregisterStudentFromHorarioByStudent(horarioId, this.idEstudiante).subscribe({
      next: (response) => {
        console.log('Estudiante desregistrado del horario:', response);
        this.studentRegisteredToHorario[horarioId] = false;
        // Mostrar mensaje de éxito
        this.snackBar.open('Cancelaste el registro del horario con éxito.', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error: (error) => {
        console.error('Error al desregistrar estudiante:', error);
        // Mostrar notificación de error
        this.snackBar.open('No se pudo cancelar el registro del horario. Seguro aun no te registraste', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}

  // Enviar reseña
  onSubmit(): void {
    if (this.reviewForm.invalid) {
      return;
    }
  }

  // Método para desregistrar al estudiante de un horario
  unregisterStudent(horarioId: number | undefined): void {
    if (horarioId !== undefined) {
      this.horarioService.unregisterStudentFromHorarioByStudent(horarioId, this.idEstudiante).subscribe({
        next: (response) => {
          console.log('Estudiante desregistrado del horario:', response);
          this.studentRegisteredToHorario[horarioId] = false;
          this.snackBar.open('Cancelaste el registro de horario con exito!', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: (error) => {
          console.error('Error al desregistrar estudiante:', error);
        }
      });
    }
  }
// Método para navegar hacia atrás
  goBack(): void {
    this.router.navigate(['/mentores']);  // Cambia '/mentores' por la ruta que desees
  }
  // Método para actualizar la calificación cuando el usuario selecciona una estrella
  setRating(rating: number): void {
    this.rating = rating;
    this.reviewForm.controls['calificacion'].setValue(rating);
  }

  // Método para enviar la reseña
  onSubmit(): void {
    if (this.reviewForm.valid) {
      const newReview: ReseñaDTO = {
        texto: this.reviewForm.value.texto,
        calificacion: this.rating,
        idEstudiante: this.idEstudiante,
        idMentor: this.idMentor
      };

      // Enviar la reseña a través del servicio
      this.reseñaService.crearReseña(this.idMentor, this.idEstudiante, newReview).subscribe({
        next: (reseñaCreada) => {
          console.log('Reseña creada con éxito:', reseñaCreada);
          // Aquí podrías hacer algo como actualizar el estado o mostrar un mensaje de éxito
          this.snackBar.open('¡Reseña enviada con éxito!', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        error: (error) => {
          console.error('Error al agregar reseña:', error);
          this.snackBar.open('Hubo un error al enviar la reseña.', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
