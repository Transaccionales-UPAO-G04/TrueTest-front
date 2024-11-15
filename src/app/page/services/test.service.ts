import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PruebaVocacionalDTO, PreguntaDTO, RespuestaDTO } from '../../shared/models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:8080/api'; // URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todas las pruebas vocacionales
  obtenerPruebasVocacionales(): Observable<PruebaVocacionalDTO[]> {
    return this.http.get<PruebaVocacionalDTO[]>(`${this.apiUrl}/pruebas-vocacionales`);
  }

  // Obtener todas las preguntas
  obtenerPreguntas(): Observable<PreguntaDTO[]> {
    return this.http.get<PreguntaDTO[]>(`${this.apiUrl}/preguntas`);
  }

  // Guardar una respuesta
  guardarRespuesta(respuesta: RespuestaDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/respuestas`, respuesta);
  }

  // Calcular el resultado de la prueba
  calcularResultado(respuestas: RespuestaDTO[]): Observable<PruebaVocacionalDTO> {
    return this.http.post<PruebaVocacionalDTO>(`${this.apiUrl}/calcular-resultado`, respuestas);
  }

  // Crear una nueva prueba vocacional
  crearPruebaVocacional(prueba: PruebaVocacionalDTO): Observable<PruebaVocacionalDTO> {
    return this.http.post<PruebaVocacionalDTO>(`${this.apiUrl}/pruebas-vocacionales`, prueba);
  }

  // Actualizar una prueba vocacional
  actualizarPruebaVocacional(id: number, prueba: PruebaVocacionalDTO): Observable<PruebaVocacionalDTO> {
    return this.http.put<PruebaVocacionalDTO>(`${this.apiUrl}/pruebas-vocacionales/${id}`, prueba);
  }

  // Eliminar una prueba vocacional
  eliminarPruebaVocacional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pruebas-vocacionales/${id}`);
  }

  // Obtener una prueba vocacional por ID
  obtenerPruebaVocacionalPorId(id: number): Observable<PruebaVocacionalDTO> {
    return this.http.get<PruebaVocacionalDTO>(`${this.apiUrl}/pruebas-vocacionales/${id}`);
  }
}