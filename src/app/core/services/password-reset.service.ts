import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private baseUrl = `${environment.baseURL}/mail`;

  constructor(private http: HttpClient) { }

  sendPasswordResetEmail(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/sendMail`, email, { responseType: 'text' as 'json' });
  }

  checkTokenValidity(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/reset/check/${token}`);
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset/${token}`, newPassword, { responseType: 'text' as 'json' });
  }
}
