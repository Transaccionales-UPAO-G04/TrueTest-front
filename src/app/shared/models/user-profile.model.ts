export interface UsuarioPerfil {
    photo?: string;
    id: number;
    email: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    nombre: string;
  }
