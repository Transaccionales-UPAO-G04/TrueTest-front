import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UsuarioPerfil } from '../../shared/models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseURL = `${environment.baseURL}/user/profile`;  // Ajusta el endpoint según tu API

  private http = inject(HttpClient);


  getUserProfile(userId: number): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`${this.baseURL}/${userId}`);
  }


  updateUserProfile(userId: number, profileData: UsuarioPerfil): Observable<UsuarioPerfil> {
    return this.http.put<UsuarioPerfil>(`${this.baseURL}/${userId}`, profileData);
  }

  getMentorOrStudentId(userId: number): Observable<number> {
    return this.http.get<UsuarioPerfil>(`${this.baseURL}/${userId}`).pipe(
      map(profile => profile.idMentor || profile.idEstudiante) // Retorna idMentor si existe, de lo contrario idEstudiante
    );
  }
}
