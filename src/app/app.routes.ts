import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgottenPassComponent } from './forgotten-pass/forgotten-pass.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrabajosComponent } from './components/trabajos/trabajos.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordrecovery', component: ForgottenPassComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  { path: 'miperfil', canActivate: [authGuard], component: MiPerfilComponent },
  { path: 'trabajos', canActivate: [authGuard], component: TrabajosComponent },
  {
    path: 'empleados',
    canActivate: [authGuard],
    component: EmpleadosComponent,
  },
  {
    path: 'crear-empleado',
    canActivate: [authGuard],
    component: CrearEmpleadoComponent,
  },
];
