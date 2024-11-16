import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AuthRequest } from '../../shared/models/auth.request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth.response.model';
import { RegisterRequest } from '../../shared/models/register.request.model';
import { RegisterResponse } from '../../shared/models/register.response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// /auth ===> guiarse por el back
  private baseURL = `${environment.baseURL}/auth`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);


  // Observable para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Método de login
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest)
      .pipe(
        tap(response => {
          this.storageService.setAuthData(response); // Guardar los datos de autenticación
          this.isAuthenticatedSubject.next(true); // Emitir el estado de autenticación
        })
      );
  }

  // Método de registro
  register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseURL}/register/estudiante`, registerRequest);
  }

  // Método de logout
  logout(): void {
    this.storageService.clearAuthData();
    this.isAuthenticatedSubject.next(false); // Emitir que el usuario ya no está autenticado
  }

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }

  // Obtener los datos del usuario
  getUser(): AuthResponse | null {
    return this.storageService.getAuthData();
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.role : null;
  }
}
