import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInverseGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (authService.isAuthenticated()) {
    // Obtiene el rol del usuario
    const userRole = authService.getUserRole();

    // Redirige según el rol del usuario
    if (userRole === 'ESTUDIANTE') {
      router.navigate(['/estudiante']); // Redirige a la página de estudiante
    } else if (userRole === 'MENTOR') {
      router.navigate(['/mentor']); // Redirige a la página de mentor
    }

    // Bloquea el acceso a las rutas de autenticación si el usuario está autenticado
    return false;
  }

  // Permite el acceso a la ruta si el usuario no está autenticado
  return true;
};
