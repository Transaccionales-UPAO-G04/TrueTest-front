export interface UsuarioPerfil {
    userId: number;
    email: string;
    nombre: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    linkRecurso?: string;
    linkRecursoPremium?: string;
    experiencia?: string;
    especialidad?: string;
    fotoPerfil?: string;
  }
