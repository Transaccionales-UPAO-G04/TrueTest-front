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

  // Obtener los horarios del mentor
  getHorarios(idMentor: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseURL}/mentor/${idMentor}`);
  }

  // Crear un nuevo horario
  createHorario(horario: any, mentorId: number): Observable<any> {
    return this.http.post(`${this.baseURL}/${mentorId}`, horario); // Usa mentorId correctamente
  }

  // Actualizar un horario
  updateHorario(idHorario: number, horario: Horario): Observable<Horario> {
    const mentorId = this.authService.getUser()?.id; // Obtener la ID del mentor desde el AuthService
    if (!mentorId) {
      throw new Error("El mentor no está autenticado.");
    }
    return this.http.put<Horario>(`${this.baseURL}/${idHorario}/mentor/${mentorId}`, horario); // Usa mentorId aquí
  }

  // Eliminar un horario
  deleteHorario(idHorario: number): Observable<void> {
    const mentorId = this.authService.getUser()?.id; // Obtener la ID del mentor desde el AuthService
    if (!mentorId) {
      throw new Error("El mentor no está autenticado.");
    }
    return this.http.delete<void>(`${this.baseURL}/${idHorario}/mentor/${mentorId}`); // Usa mentorId aquí
  }
}