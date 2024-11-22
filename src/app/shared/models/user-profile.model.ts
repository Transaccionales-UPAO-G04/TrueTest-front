export interface UsuarioPerfil {
    id: number;
    email: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    nombre: string;
  }
