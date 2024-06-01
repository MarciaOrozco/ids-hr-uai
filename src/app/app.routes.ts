import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgottenPassComponent } from './forgotten-pass/forgotten-pass.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { CargarCurriculumComponent } from './cargar-curriculum/cargar-curriculum.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordrecovery', component: ForgottenPassComponent },
  { path: 'miperfil', component: MiPerfilComponent },
  { path: 'miperfil/cv', component: CargarCurriculumComponent },
];
