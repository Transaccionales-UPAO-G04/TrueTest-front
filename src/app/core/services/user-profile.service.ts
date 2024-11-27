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

  //obtener perfil del usuario por id
  getUserProfile(userId: number): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`${this.baseURL}/${userId}`);
  }

  //actualizar datos del pefil como nombre
  updateUserProfile(userId: number, profileData: UsuarioPerfil): Observable<UsuarioPerfil> {
    return this.http.put<UsuarioPerfil>(`${this.baseURL}/${userId}`, profileData);
  }

  //Metodo para obtener la foto de perfil o usar la predeterminada si es null
  getUserFoto(userProfile: UsuarioPerfil): string {
    // Si la foto de perfil es null o vacía, devolvemos la imagen predeterminada
    return userProfile.fotoPerfil ? `${this.baseURL}${userProfile.fotoPerfil}` : 'profile/user.png';
  }

}
