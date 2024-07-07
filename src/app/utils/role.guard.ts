import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';

export const RoleEmpleadoGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const userId = localStorage.getItem('userId');
  if (!userId) {
    router.navigate(['/dashboard']);
    return false;
  }

  return userService.getUserGrupo(userId).pipe(
    map((res: any) => {
      if (res.Grupo.Nombre === 'Empleado') {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError((error) => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

export const RolePostulanteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const userId = localStorage.getItem('userId');
  if (!userId) {
    router.navigate(['/dashboard']);
    return false;
  }

  return userService.getUserGrupo(userId).pipe(
    map((res: any) => {
      if (res.Grupo.Nombre === 'Postulante') {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError((error) => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
