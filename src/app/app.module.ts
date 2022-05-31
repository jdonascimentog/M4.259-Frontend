import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Componentes/auth/auth.component';
import { BandejaComponent } from './Componentes/bandeja/bandeja.component';
import { CentroComponent } from './Componentes/centro/centro.component';
import { EstadisticaComponent } from './Componentes/estadistica/estadistica.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsersComponent } from './Componentes/users/users.component';
import { AuthInterceptorService } from './Servicios/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    BandejaComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    EstadisticaComponent,
    UsersComponent,
    CentroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
