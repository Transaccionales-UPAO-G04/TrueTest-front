export interface Horario {
    idHorario?: number;
  fecha: string;
  horaSesion: string;
  linkSesionPublica: string;
  nombre?: string; // Nombre del estudiante asignado (opcional, puede ser null o no asignado)
}