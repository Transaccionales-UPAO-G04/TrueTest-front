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
  estudiantesAsignados: string[] = []; // Para almacenar el nombre de estudiantes asignados a cada horario

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
            
                // Actualización de la lista de estudiantes asignados
                this.estudiantesAsignados = horarios.map(horario => horario.nombre ? horario.nombre : 'Ningún estudiante registrado');
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
                // Inicializar el estudiante como "Ningún estudiante registrado"
                this.estudiantesAsignados.push('Ningún estudiante registrado');
                this.newHorario = { fecha: '', horaSesion: '', linkSesionPublica: '' }; // Resetear formulario
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
  

  editHorario(horario: Horario): void {
    if (horario && horario.idHorario != null) { // Asegúrate de que idHorario no sea null ni undefined
      const user = this.authService.getUser();
      if (user) {
        this.perfilUsuarioService.getMentorOrStudentId(user.id).subscribe({
          next: (idMentor) => {
            if (idMentor) {
              this.horarioService.updateHorario(horario.idHorario!, horario, idMentor).subscribe(
                (horarioActualizado) => {
                  const index = this.horarios.findIndex(h => h.idHorario === horario.idHorario);
                  if (index !== -1) {
                    this.horarios[index] = horarioActualizado;
                  }
                  this.snackBar.open('Horario actualizado con éxito', 'Cerrar', { duration: 3000 });
                  this.cancelEditing();
                },
                (error) => {
                  console.error('Error al actualizar horario:', error);
                  this.snackBar.open('Error al actualizar horario', 'Cerrar', { duration: 3000 });
                }
              );
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
      }
    } else {
      console.error('ID del horario no válido para edición');
      this.snackBar.open('ID del horario no válido para edición', 'Cerrar', { duration: 3000 });
    }
  }
  
  

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