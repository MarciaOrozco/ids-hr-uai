import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrabajosComponent } from './components/empleos/trabajos/trabajos.component';
import { CrearEmpleadoComponent } from './components/empleado/crear-empleado/crear-empleado.component';
import { authGuard } from './utils/auth.guard';
import { ForgottenPassComponent } from './components/forgotten-pass/forgotten-pass.component';
import { EmpleadosComponent } from './components/empleado/empleados/empleados.component';
import { noAuthGuard } from './utils/no-auth.guard';
import { RoleEmpleadoGuard, RolePostulanteGuard } from './utils/role.guard';
import { CambiarClaveComponent } from './components/cambiar-clave/cambiar-clave.component';
import { CrearEmpleoComponent } from './components/empleos/crear-empleo/crear-empleo.component';
import { ModificarEmpleosComponent } from './components/empleos/modificar-empleos/modificar-empleos.component';
import { EmpleoDetalleComponent } from './components/postulante/empleo-detalle/empleo-detalle.component';
import { MisPostulacionesComponent } from './components/postulante/mis-postulaciones/mis-postulaciones.component';
import { PostulacionesComponent } from './components/postulaciones/postulaciones/postulaciones.component';
import { PerfilPostulanteComponent } from './components/postulaciones/perfil-postulante/perfil-postulante.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard],
  },
  { path: 'passwordrecovery', component: ForgottenPassComponent },
  { path: 'cambiar-clave', component: CambiarClaveComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  {
    path: 'miperfil',
    canActivate: [authGuard, RolePostulanteGuard],
    component: MiPerfilComponent,
  },
  {
    path: 'mis-postulaciones',
    canActivate: [authGuard, RolePostulanteGuard],
    component: MisPostulacionesComponent,
  },
  { path: 'trabajos', canActivate: [authGuard], component: TrabajosComponent },
  {
    path: 'crear-empleo',
    canActivate: [authGuard, RoleEmpleadoGuard],
    component: CrearEmpleoComponent,
  },
  {
    path: 'empleados',
    canActivate: [authGuard, RoleEmpleadoGuard],
    component: EmpleadosComponent,
  },
  {
    path: 'crear-empleado',
    canActivate: [authGuard, RoleEmpleadoGuard],
    component: CrearEmpleadoComponent,
  },
  {
    path: 'modificar-empleo/:id',
    canActivate: [authGuard, RoleEmpleadoGuard],
    component: ModificarEmpleosComponent,
  },
  {
    path: 'detalle-empleo/:id',
    canActivate: [authGuard],
    component: EmpleoDetalleComponent,
  },
  {
    path: 'perfil-postulante/:postulanteId/:postulacion',
    canActivate: [authGuard, RoleEmpleadoGuard],
    component: PerfilPostulanteComponent,
  },
  {
    path: 'ver-postulaciones/:id',
    canActivate: [authGuard, RoleEmpleadoGuard],
    component: PostulacionesComponent,
  },
  { path: '**', redirectTo: '/login' },
];
