import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MensajeDTO } from '../Modelos/mensaje.dto';
import { UsuarioDTO } from '../Modelos/usuario.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BandejaService {
  private urlServicio: string;
  private controller: string;
  private mensajes: MensajeDTO[] = [
    {
      id: 23,
      mensaje: 'Prueba de mensaje 1',
      id_remitente: 2,
      login_remitente: 'admin_centro1',
      id_destino: 1,
      login_destino: 'admin',
      fecha: new Date(),
    },
    {
      id: 24,
      mensaje: 'Prueba respuesta de mensaje 1',
      id_remitente: 1,
      login_remitente: 'admin',
      id_destino: 2,
      login_destino: 'admin_centro1',
      fecha: new Date(),
    },
    {
      id: 25,
      mensaje: 'Prueba mensaje 2',
      id_remitente: 3,
      login_remitente: 'admin_centro2',
      id_destino: 1,
      login_destino: 'admin',
      fecha: new Date(),
    },
  ];
  private contactos: UsuarioDTO[] = [
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
    this.controller = 'mensajeria';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getMensajes(): Observable<MensajeDTO[]> {
    const user_id = this.localStorageService.get('user_id');
    const mensajes = this.mensajes.filter(
      (mensaje) =>
        mensaje.login_destino == user_id || mensaje.login_remitente == user_id
    );
    return of(mensajes);
  }

  getContactos(): Observable<UsuarioDTO[]> {
    const rol = this.localStorageService.get('roles');
    const user_id = this.localStorageService.get('user_id');
    let contactos: UsuarioDTO[] = [];
    if (rol == 'admin') {
      contactos = this.contactos.filter((user) => user.rol == 'admin_centro');
    } else if (rol == 'educador') {
      contactos = this.contactos.filter(
        (user) =>
          (user.rol == 'admin_centro' ||
            user.rol == 'educador' ||
            user.rol == 'usuario') &&
          user.login != user_id
      );
    } else if (rol == 'usuario') {
      contactos = this.contactos.filter(
        (user) =>
          (user.rol == 'admin_centro' || user.rol == 'educador') &&
          user.login != user_id
      );
    } else {
      contactos = this.contactos.filter((user) => user.login != user_id);
    }
    return of(contactos);
  }

  createMensaje(mensaje: MensajeDTO): Observable<MensajeDTO> {
    const id = Math.max(...this.mensajes.map((o) => o.id)) + 1;
    mensaje.id = id;
    this.mensajes.push(mensaje);
    return of(mensaje);
  }

  deleteMensaje(mensajeId: number): Observable<boolean> {
    this.mensajes = [...this.mensajes.filter((m) => m.id !== mensajeId)];
    return of(true);
  }
}
