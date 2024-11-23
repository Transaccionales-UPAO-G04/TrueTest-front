export interface UsuarioPerfil {
    userId: number;
    email: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    nombre: string;
  }
