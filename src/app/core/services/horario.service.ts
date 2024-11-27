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
updateHorario(idHorario: number, horario: Horario, idMentor: number): Observable<Horario> {
  if (!idMentor) {
    throw new Error("El mentor no está autenticado o no tiene un mentor asignado.");
  }
  return this.http.put<Horario>(`${this.baseURL}/${idHorario}/mentor/${idMentor}`, horario); // Usa idMentor aquí
}


  // Eliminar un horario
deleteHorario(idHorario: number, idMentor: number): Observable<void> {
  if (!idMentor) {
    throw new Error("El mentor no está autenticado o no tiene un mentor asignado.");
  }
  return this.http.delete<void>(`${this.baseURL}/${idHorario}/mentor/${idMentor}`); // Usa idMentor aquí
}

}