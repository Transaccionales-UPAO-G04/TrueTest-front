import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mentor } from '../../shared/models/estudiante-mentor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EstudianteMentorService {
  private baseURL = `${environment.baseURL}/api/mentores`;  // Ajusta la URL según el endpoint real

  constructor(private http: HttpClient) { }

  getAllMentors(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(this.baseURL);
  }
}