export interface PruebaVocacionalDTO {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    icon: string;
    carrera: string;
  }
  
  export interface PreguntaDTO {
    id: number;
    text: string;
    area: string;
  }
  
  export interface RespuestaDTO {
    idPregunta: number;
    puntuacion: number;
  }