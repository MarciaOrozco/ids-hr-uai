import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrabajosComponent } from './components/trabajos/trabajos.component';
import { CrearEmpleadoComponent } from './components/empleado/crear-empleado/crear-empleado.component';
import { authGuard } from './utils/auth.guard';
import { ForgottenPassComponent } from './components/forgotten-pass/forgotten-pass.component';
import { EmpleadosComponent } from './components/empleado/empleados/empleados.component';
import { noAuthGuard } from './utils/no-auth.guard';
import { RoleEmpleadoGuard, RolePostulanteGuard } from './utils/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noAuthGuard],
  },
  { path: 'passwordrecovery', component: ForgottenPassComponent },
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
  { path: 'trabajos', canActivate: [authGuard], component: TrabajosComponent },
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
  { path: '**', redirectTo: '/login' },
];
