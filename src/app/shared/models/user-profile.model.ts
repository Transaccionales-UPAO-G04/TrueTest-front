export interface UsuarioPerfil {
    userId: number;
    email: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    nombre: string;
    fotoPerfil: string;
    idEstudiante: number;
    idMentor: number;
  }
