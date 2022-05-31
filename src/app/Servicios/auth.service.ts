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

  constructor(private http: HttpClient) {
    this.controller = 'auth';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  login(auth: AuthDTO): Observable<AuthToken> {
    let authToken: AuthToken = {
      user_id: 'user1',
      access_token: 'UTREG67YT',
      rol: 'A',
    };
    return of(authToken);
    /*return this.http
      .post<AuthToken>(this.urlServicio, auth)
      .pipe(catchError(this.handleError));*/
  }

  handleError(error: HttpErrorResponse) {
    /*return throwError(error);*/
  }
}
