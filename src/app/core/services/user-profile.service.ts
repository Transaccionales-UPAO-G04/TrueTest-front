import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  updateProfilePhoto(userId: number, photo: string): Observable<any> {
    return this.http.put(`${this.baseURL}/${userId}/foto`, { fotoPerfil: photo });
  }

}
