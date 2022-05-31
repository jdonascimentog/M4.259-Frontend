import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MensajeDTO } from '../Modelos/mensaje.dto';
import { UsuarioDTO } from '../Modelos/usuario.dto';

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
      login_remitente: 'directorCentro1',
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
      login_destino: 'directorCentro1',
      fecha: new Date(),
    },
    {
      id: 25,
      mensaje: 'Prueba mensaje 2',
      id_remitente: 3,
      login_remitente: 'directorCentro2',
      id_destino: 1,
      login_destino: 'admin',
      fecha: new Date(),
    },
  ];
  private contactos: UsuarioDTO[] = [
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
    this.controller = 'mensajeria';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getMensajes(): Observable<MensajeDTO[]> {
    return of(this.mensajes);
  }

  getContactos(): Observable<UsuarioDTO[]> {
    return of(this.contactos);
  }

  createMensaje(mensaje: MensajeDTO): Observable<MensajeDTO> {
    this.mensajes.push(mensaje);
    return of(mensaje);
  }

  deleteMensaje(mensajeId: number): Observable<boolean> {
    this.mensajes = [...this.mensajes.filter((m) => m.id !== mensajeId)];
    return of(true);
  }
}
