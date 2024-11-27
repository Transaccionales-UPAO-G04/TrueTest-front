import { Component, OnInit } from '@angular/core';
import { Horario } from '../../../shared/models/horario.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HorarioService } from '../../../core/services/horario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../../core/services/user-profile.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent implements OnInit {

  horarios: Horario[] = [];
  newHorario: Horario = { fecha: '', horaSesion: '', linkSesionPublica: '' };
  editableHorario: Horario | null = null; // Horario en edición

  constructor(
    private horarioService: HorarioService, 
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private perfilUsuarioService: UserProfileService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.perfilUsuarioService.getMentorOrStudentId(user.id).subscribe({
        next: (idMentor) => {
          if (idMentor) {
            console.log('ID del mentor:', idMentor);
            this.horarioService.getHorarios(idMentor).subscribe({
              next: (horarios) => {
                console.log('Horarios cargados:', horarios);
                this.horarios = horarios;
              },
              error: (err) => {
                console.error('Error al cargar horarios:', err);
              }
            });
          } else {
            this.snackBar.open('No se encontró un mentor asociado al usuario', 'Cerrar', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error al obtener el ID del mentor:', err);
        }
      });
    }
  }

  createHorario(): void {
    const user = this.authService.getUser();
    if (user) {
      this.perfilUsuarioService.getMentorOrStudentId(user.id).subscribe({
        next: (idMentor) => {
          if (idMentor) {
            const horarioData = { ...this.newHorario };
            console.log('Datos enviados al backend:', horarioData); // Depuración
            this.horarioService.createHorario(horarioData, idMentor).subscribe({
              next: (horario) => {
                this.horarios.push(horario);
                this.newHorario = { fecha: '', horaSesion: '', linkSesionPublica: '' };
                this.snackBar.open('Horario creado con éxito', 'Cerrar', { duration: 3000 });
              },
              error: (error) => {
                console.error('Error al crear horario:', error);
                this.snackBar.open('Error al crear horario', 'Cerrar', { duration: 3000 });
              }
            });
          } else {
            this.snackBar.open('No se encontró un mentor asociado al usuario', 'Cerrar', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error al obtener el ID del mentor:', err);
          this.snackBar.open('Error al obtener el ID del mentor', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  // Método para editar un horario existente
// Método para editar un horario existente
editHorario(horario: Horario): void {
  if (horario && horario.idHorario) {
    const user = this.authService.getUser();
    if (user) {
      this.perfilUsuarioService.getMentorOrStudentId(user.id).subscribe({
        next: (idMentor) => {
          if (idMentor) {
            // Verifica si el idHorario es válido antes de hacer la llamada
            if (horario.idHorario !== undefined && horario.idHorario !== null) {
              // Ahora que tienes el ID del mentor, puedes actualizar el horario
              this.horarioService.updateHorario(horario.idHorario, horario, idMentor).subscribe(
                (horarioActualizado) => {
                  const index = this.horarios.findIndex(h => h.idHorario === horario.idHorario);
                  if (index !== -1) {
                    this.horarios[index] = horarioActualizado;
                  }
                  this.snackBar.open('Horario actualizado con éxito', 'Cerrar', { duration: 3000 });
                  this.cancelEditing(); // Limpiar el formulario de edición
                },
                (error) => {
                  console.error('Error al actualizar horario:', error);
                  this.snackBar.open('Error al actualizar horario', 'Cerrar', { duration: 3000 });
                }
              );
            } else {
              console.error('ID de horario no válido');
              this.snackBar.open('ID de horario no válido', 'Cerrar', { duration: 3000 });
            }
          } else {
            console.error('No se encontró un mentor asociado al usuario');
            this.snackBar.open('No se encontró un mentor asociado al usuario', 'Cerrar', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error al obtener el ID del mentor:', err);
          this.snackBar.open('Error al obtener el ID del mentor', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      console.error('Usuario no encontrado');
      this.snackBar.open('Usuario no encontrado', 'Cerrar', { duration: 3000 });
    }
  } else {
    console.error('Horario no válido');
    this.snackBar.open('Horario no válido', 'Cerrar', { duration: 3000 });
  }
}


  

  // Método para eliminar un horario
deleteHorario(idHorario: number): void {
  if (idHorario) {
    const user = this.authService.getUser();
    if (user) {
      this.perfilUsuarioService.getMentorOrStudentId(user.id).subscribe({
        next: (idMentor) => {
          if (idMentor) {
            this.horarioService.deleteHorario(idHorario, idMentor).subscribe(
              () => {
                this.horarios = this.horarios.filter(h => h.idHorario !== idHorario);
                this.snackBar.open('Horario eliminado con éxito', 'Cerrar', { duration: 3000 });
              },
              (error) => {
                console.error('Error al eliminar horario:', error);
                this.snackBar.open('Error al eliminar horario', 'Cerrar', { duration: 3000 });
              }
            );
          } else {
            this.snackBar.open('No se encontró un mentor asociado al usuario', 'Cerrar', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error al obtener el ID del mentor:', err);
          this.snackBar.open('Error al obtener el ID del mentor', 'Cerrar', { duration: 3000 });
        }
      });
    }
  } else {
    console.error('ID de horario no válido');
    this.snackBar.open('ID de horario no válido', 'Cerrar', { duration: 3000 });
  }
}


  startEditing(horario: Horario): void {
    if (horario) {
      this.editableHorario = { ...horario }; // Clonamos para no afectar directamente el objeto original
    } else {
      console.error('Horario no válido para edición');
      this.snackBar.open('Horario no válido para edición', 'Cerrar', { duration: 3000 });
    }
  }

  cancelEditing(): void {
    this.editableHorario = null; // Limpia el modelo temporal
  }
}