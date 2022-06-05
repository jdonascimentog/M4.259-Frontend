import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './Componentes/agenda/agenda.component';
import { AlumnoComponent } from './Componentes/alumno/alumno.component';
import { AlumnosComponent } from './Componentes/alumnos/alumnos.component';
import { AulaComponent } from './Componentes/aula/aula.component';
import { AulasComponent } from './Componentes/aulas/aulas.component';
import { BandejaComponent } from './Componentes/bandeja/bandeja.component';
import { CentroPortadaComponent } from './Componentes/centro-portada/centro-portada.component';
import { CentroComponent } from './Componentes/centro/centro.component';
import { EstadisticaComponent } from './Componentes/estadistica/estadistica.component';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsersComponent } from './Componentes/users/users.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'estadistica',
    component: EstadisticaComponent,
    data: { roles: 'admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    data: { roles: 'admin|admin_centro|educador' },
    canActivate: [AuthGuard],
  },
  {
    path: 'bandeja',
    component: BandejaComponent,
    data: { roles: 'admin|admin_centro|educador|usuario' },
    canActivate: [AuthGuard],
  },
  {
    path: 'centro',
    component: CentroComponent,
    data: { roles: 'admin|admin_centro' },
    canActivate: [AuthGuard],
  },
  {
    path: 'centro-portada',
    component: CentroPortadaComponent,
    data: { roles: 'admin_centro|educador|usuario' },
    canActivate: [AuthGuard],
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    data: { roles: 'admin_centro|educador|usuario' },
    canActivate: [AuthGuard],
  },
  {
    path: 'aulas',
    component: AulasComponent,
    data: { roles: 'admin_centro|educador' },
    canActivate: [AuthGuard],
  },
  {
    path: 'aula',
    component: AulaComponent,
    data: { roles: 'educador' },
    canActivate: [AuthGuard],
  },
  {
    path: 'alumnos',
    component: AlumnosComponent,
    data: { roles: 'usuario' },
    canActivate: [AuthGuard],
  },
  {
    path: 'alumno',
    component: AlumnoComponent,
    data: { roles: 'educador|usuario' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
