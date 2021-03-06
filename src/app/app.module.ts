import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeES from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarNativeDateFormatter,
  DateAdapter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaComponent } from './Componentes/agenda/agenda.component';
import { AulaComponent } from './Componentes/aula/aula.component';
import { AulasComponent } from './Componentes/aulas/aulas.component';
import { AuthComponent } from './Componentes/auth/auth.component';
import { BandejaComponent } from './Componentes/bandeja/bandeja.component';
import { CentroPortadaComponent } from './Componentes/centro-portada/centro-portada.component';
import { CentroComponent } from './Componentes/centro/centro.component';
import { EstadisticaComponent } from './Componentes/estadistica/estadistica.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { HomeComponent } from './Componentes/home/home.component';
import { LoginComponent } from './Componentes/login/login.component';
import { UsersComponent } from './Componentes/users/users.component';
import { AuthInterceptorService } from './Servicios/auth-interceptor.service';
registerLocaleData(localeES, 'es');

export class DateCalendarModule extends CalendarNativeDateFormatter {
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('es-ES', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

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
    CentroPortadaComponent,
    AgendaComponent,
    AulasComponent,
    AulaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: DateCalendarModule,
        },
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
