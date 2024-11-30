import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Horario } from '../../shared/models/horario.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseURL = `${environment.baseURL}/api/horarios`; // Usa backticks aquí para interpolación correcta

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener horarios por mentor
  getHorarios(idMentor: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseURL}/mentor/${idMentor}`);
  }

  // Crear un horario
  createHorario(horario: Horario, idMentor: number): Observable<Horario> {
    return this.http.post<Horario>(`${this.baseURL}/${idMentor}`, horario);
  }

  // Actualizar un horario
  updateHorario(idHorario: number, horario: Horario, idMentor: number): Observable<Horario> {
    return this.http.put<Horario>(`${this.baseURL}/${idHorario}/mentor/${idMentor}`, horario);
  }

  // Eliminar un horario
  deleteHorario(idHorario: number, idMentor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${idHorario}/mentor/${idMentor}`);
  }

  // Registrar un estudiante en un horario
  registerStudentToHorario(idHorario: number, idEstudiante: number): Observable<Horario> {
    return this.http.post<Horario>(`${this.baseURL}/${idHorario}/estudiante/${idEstudiante}`, {});
  }

  // Desregistrar un estudiante de un horario (por el estudiante)
  unregisterStudentFromHorarioByStudent(idHorario: number, idEstudiante: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${idHorario}/estudiante/${idEstudiante}`);
  }

  // Desregistrar un estudiante de un horario (por el mentor)
  unregisterStudentFromHorarioByMentor(idHorario: number, idEstudiante: number, idMentor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${idHorario}/mentor/${idMentor}/estudiante/${idEstudiante}`);
  }
}