export interface UsuarioPerfil {
    photo?: string;
    userId: number;
    email: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    nombre: string;
  }
