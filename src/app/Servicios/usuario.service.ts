import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsuarioDTO } from '../Modelos/usuario.dto';
import { LocalStorageService } from './local-storage.service';

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
      rol: 'admin',
    },
    {
      id: 2,
      login: 'admin_centro1',
      email: 'admin_centro1@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'admin_centro',
    },
    {
      id: 3,
      login: 'admin_centro2',
      email: 'admin_centro2@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'admin_centro',
    },
    {
      id: 4,
      login: 'educador1',
      email: 'educador1@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'educador',
    },
    {
      id: 5,
      login: 'educador2',
      email: 'educador2@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'educador',
    },
    {
      id: 6,
      login: 'madre1',
      email: 'madre1@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'usuario',
    },
    {
      id: 7,
      login: 'madre2',
      email: 'madre2@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'usuario',
    },
    {
      id: 8,
      login: 'padre3',
      email: 'padre3@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'usuario',
    },
    {
      id: 9,
      login: 'padre4',
      email: 'padre4@kindergarten.es',
      telefono: 99,
      password: '',
      rol: 'usuario',
    },
  ];

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.controller = 'usuario';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getUsuarios(): Observable<UsuarioDTO[]> {
    const rol = this.localStorageService.get('roles');
    let usuarios: UsuarioDTO[] = [];
    if (rol == 'admin') {
      usuarios = this.usuarios.filter(
        (user) => user.rol == 'admin' || user.rol == 'admin_centro'
      );
    } else if (rol == 'admin_centro') {
      usuarios = this.usuarios.filter((user) => user.rol != 'admin');
    } else {
      usuarios = this.usuarios.filter(
        (user) => user.rol != 'admin' && user.rol != 'admin_centro'
      );
    }
    return of(usuarios);
  }

  getUsuarioByLogin(login: string): Observable<UsuarioDTO> {
    let usuario: UsuarioDTO = {
      id: 0,
      login: '',
      email: '',
      telefono: 99,
      password: '',
      rol: '',
    };

    if (this.usuarios.some((usu) => usu.login == login)) {
      usuario = this.usuarios.filter((usu) => usu.login == login)[0];
      usuario.password = '';
    }

    return of(usuario);
  }

  createUsuario(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    const id = Math.max(...this.usuarios.map((o) => o.id)) + 1;
    usuario.id = id;
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
