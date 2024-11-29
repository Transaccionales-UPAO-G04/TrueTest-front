import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReseñaDTO} from "../../shared/models/reseña.request.model";// Asegúrate de que el modelo esté bien definido


@Injectable({
  providedIn: 'root'
})
export class ReseñaService {

  private baseUrl = `${environment.baseURL}/api/reseñas`; // Asegúrate de que `environment.apiUrl` tenga la URL base de la API

  constructor(private http: HttpClient) { }

  // Método para crear una reseña
  crearReseña(idMentor: number, idEstudiante: number, reseñaDTO: ReseñaDTO): Observable<ReseñaDTO> {
    const url = `${this.baseUrl}/${idMentor}/crear-reseña`;
    return this.http.post<ReseñaDTO>(url, reseñaDTO, { params: { idEstudiante: idEstudiante.toString() } });
  }
}
