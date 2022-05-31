import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaComponent } from './Componentes/bandeja/bandeja.component';
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
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bandeja',
    component: BandejaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'centro',
    component: CentroComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
