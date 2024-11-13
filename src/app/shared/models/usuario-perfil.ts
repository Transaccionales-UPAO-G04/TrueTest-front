export interface UsuarioPerfil {
    id: number;
    email: string;
    role: 'ESTUDIANTE' | 'MENTOR' | null;
    firstName: string;
    lastName: string;
    shippingAddress?: string;
    bio?: string;
  }