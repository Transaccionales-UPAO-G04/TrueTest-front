import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {UserProfileService} from "../../../../core/services/user-profile.service";
import { AuthService } from "../../../../core/services/auth.service";
import { EstudianteMentorService } from "../../../../core/services/estudiante-mentor.service";
import { ReseñaService } from "../../../../core/services/reseña.service";
import { Reseña } from "../../../../shared/models/reseña.response.model";
import { ReseñaDTO } from "../../../../shared/models/reseña.request.model";  // Asegúrate de que este DTO esté bien definido
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


  private router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private mentorService: EstudianteMentorService,
    private reseñaService: ReseñaService,
    private horarioService: HorarioService, // Inyecta el servicio de horarios
    private fb: FormBuilder,
    private authService: AuthService,
    private perfilUsuario: UserProfileService,
    private snackBar: MatSnackBar  // Inyección de MatSnackBar

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
    this.loadMentorHorarios(this.idMentor); // Llama al método para cargar los horarios

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

  loadMentorHorarios(mentorId: number): void {
    this.horarioService.getHorarios(mentorId).subscribe({
      next: (horarios) => {
        this.horarios = horarios;
        this.studentRegisteredToHorario = new Array(horarios.length).fill(false);  // Inicializa el array con 'false' para cada horario
      },
      error: (error) => {
        console.error('Error al cargar los horarios del mentor', error);
      }
    });
  }
  
// Registrar al estudiante en un horario
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

  goBack(): void {
    this.router.navigate(['/estudiante/mentores']);  // Redirige a la página de mentores
  }

}
