import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthToken } from '../Modelos/auth-token.dto';
import { AuthDTO } from '../Modelos/auth.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlServicio: string;
  private controller: string;

  users: AuthDTO[] = [
    {
      user_id: 'admin',
      access_token: '',
      email: 'admin@kindergarten.com',
      password: '11111111',
      roles: '',
    },
    {
      user_id: 'admin_centro1',
      access_token: '',
      email: 'admin_centro1@kindergarten.com',
      password: '22222222',
      roles: '',
    },
    {
      user_id: 'admin_centro2',
      access_token: '',
      email: 'admin_centro2@kindergarten.com',
      password: '33333333',
      roles: '',
    },
    {
      user_id: 'educador1',
      access_token: '',
      email: 'educador1@kindergarten.com',
      password: '44444444',
      roles: '',
    },
    {
      user_id: 'educador2',
      access_token: '',
      email: 'educador2@kindergarten.com',
      password: '55555555',
      roles: '',
    },
    {
      user_id: 'madre1',
      access_token: '',
      email: 'madre1@kindergarten.com',
      password: '66666666',
      roles: '',
    },
    {
      user_id: 'madre2',
      access_token: '',
      email: 'madre2@kindergarten.com',
      password: '77777777',
      roles: '',
    },
    {
      user_id: 'padre3',
      access_token: '',
      email: 'padre3@kindergarten.com',
      password: '88888888',
      roles: '',
    },
    {
      user_id: 'padre4',
      access_token: '',
      email: 'padre4@kindergarten.com',
      password: '99999999',
      roles: '',
    },
  ];

  auths: AuthToken[] = [
    {
      user_id: 'admin',
      access_token: 'UTREG67YT',
      rol: 'admin',
    },
    {
      user_id: 'admin_centro1',
      access_token: '89FHKNA9',
      rol: 'admin_centro',
    },
    {
      user_id: 'admin_centro2',
      access_token: 'UIKJJHD67H',
      rol: 'admin_centro',
    },
    {
      user_id: 'educador1',
      access_token: 'ASDAFF5642AH',
      rol: 'educador',
    },
    {
      user_id: 'educador2',
      access_token: 'VBNNC8HJ',
      rol: 'educador',
    },
    {
      user_id: 'madre1',
      access_token: 'FHJ67HGH',
      rol: 'usuario',
    },
    {
      user_id: 'madre2',
      access_token: 'QWE123HGB',
      rol: 'usuario',
    },
    {
      user_id: 'padre3',
      access_token: '555AGSDCV',
      rol: 'usuario',
    },
    {
      user_id: 'padre4',
      access_token: 'TFGCCAGY',
      rol: 'usuario',
    },
  ];

  constructor(private http: HttpClient) {
    this.controller = 'auth';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    let authToken: AuthToken | undefined = {
      user_id: '',
      access_token: '',
      rol: '',
    };
    const user = this.users.find(
      (usuario) => auth.password == usuario.password && auth.email == auth.email
    );
    if (user) {
      authToken = this.auths.find((auth) => auth.user_id == user.user_id);
      if (!authToken) {
        authToken = {
          user_id: '',
          access_token: '',
          rol: '',
        };
      }
    }
    return of(authToken);
    /*return this.http
      .post<AuthToken>(this.urlServicio, auth)
      .pipe(catchError(this.handleError));*/
  }

  handleError(error: HttpErrorResponse) {
    /*return throwError(error);*/
  }
}
