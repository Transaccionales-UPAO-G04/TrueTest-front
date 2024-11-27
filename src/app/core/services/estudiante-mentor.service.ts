import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mentor } from '../../shared/models/estudiante-mentor.model';
import { Observable } from 'rxjs';
import {Reseña} from "../../shared/models/reseña.request.model";

@Injectable({
  providedIn: 'root'
})

export class EstudianteMentorService {
  private baseURL = `${environment.baseURL}/api/mentores`;  // Ajusta la URL según el endpoint real
  private baseURL2 = `${environment.baseURL}`;

  constructor(private http: HttpClient) { }

  getAllMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(this.baseURL);
  }
  // Obtener un mentor específico por ID
  getMentorById(mentorId: number): Observable<Mentor> {
    return this.http.get<Mentor>(`${this.baseURL}/${mentorId}`);
  }

// Obtener reseñas de un mentor
  getReseñasByMentorId(mentorId: number): Observable<Reseña[]> {
    return this.http.get<Reseña[]>(`${this.baseURL2}/api/reseñas/${mentorId}/`);
  }

}
