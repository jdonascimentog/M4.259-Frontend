import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsuarioDTO } from '../Modelos/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlServicio: string;
  private controller: string;
  private usuarios: UsuarioDTO[] = [
    {
      id: 1,
      login: 'admin',
      email: 'admin@kindergarten.es',
      telefono: 99,
      password: '',
    },
    {
      id: 2,
      login: 'directorCentro1',
      email: 'director1@kindergarten.es',
      telefono: 99,
      password: '',
    },
    {
      id: 3,
      login: 'directorCentro2',
      email: 'director2@kindergarten.es',
      telefono: 99,
      password: '',
    },
    {
      id: 4,
      login: 'directorCentro3',
      email: 'director3@kindergarten.es',
      telefono: 99,
      password: '',
    },
    {
      id: 5,
      login: 'directorCentro4',
      email: 'director4@kindergarten.es',
      telefono: 99,
      password: '',
    },
  ];

  constructor(private http: HttpClient) {
    this.controller = 'usuario';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getUsuarios(): Observable<UsuarioDTO[]> {
    return of(this.usuarios);
  }

  createUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    this.usuarios.push(usuario);
    return of(usuario);
  }

  updateUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    let u: UsuarioDTO | undefined = this.usuarios.find(
      (us) => us.id == usuario.id
    );

    if (u) {
      u.email = usuario.email;
      u.login = usuario.login;
      u.telefono = usuario.telefono;
      u.password = usuario.password;

      this.usuarios = [...this.usuarios.filter((usu) => usu.id !== usuario.id)];
      this.usuarios.push(u);
    }

    return of(usuario);
  }

  deleteUsuario(usuarioId: number): Observable<boolean> {
    this.usuarios = [...this.usuarios.filter((usu) => usu.id !== usuarioId)];
    return of(true);
  }
}
