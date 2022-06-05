import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CentroDTO } from '../Modelos/centro.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CentroService {
  private urlServicio: string;
  private controller: string;
  private centros: CentroDTO[] = [
    {
      id: 1,
      nombre: 'Centro1',
      descripcion:
        'Este centro de educación infantil se dedica a crear el entorno apropiado apra que los infantes comiencen a despertar su curiosidad y sus primeros pasos en su nuevo mundo. Fundada en 1986, nos abalan muchos años de experiencia y de cercanía a las familias.',
      direccion: 'Calle prueba',
      telefono: 99,
      imagen:
        'https://pixabay.com/get/g1171ddba7f9213db821baca9e8a115939e77717f20a4336f1ce40571076012103430989f4195067e85966bc4083e91cd9e2394033e87db098d09f954b20aab2ddc232c81c26d7f17233de6f9a3471eb6_1920.jpg',
    },
    {
      id: 2,
      nombre: 'Centro2',
      descripcion: '',
      direccion: 'Calle prueba',
      telefono: 99,
      imagen: '',
    },
    {
      id: 3,
      nombre: 'Centro3',
      descripcion: '',
      direccion: 'Calle prueba',
      telefono: 99,
      imagen: '',
    },
  ];

  private usuariosCentros: {
    id_usuario: number;
    login: string;
    id_centro: number;
  }[] = [
    {
      id_usuario: 2,
      login: 'admin_centro1',
      id_centro: 1,
    },
    {
      id_usuario: 3,
      login: 'admin_centro2',
      id_centro: 1,
    },
    {
      id_usuario: 4,
      login: 'educador1',
      id_centro: 1,
    },
    {
      id_usuario: 5,
      login: 'educador2',
      id_centro: 1,
    },
    {
      id_usuario: 6,
      login: 'madre1',
      id_centro: 1,
    },
    {
      id_usuario: 7,
      login: 'madre2',
      id_centro: 1,
    },
    {
      id_usuario: 8,
      login: 'padre3',
      id_centro: 1,
    },
    {
      id_usuario: 9,
      login: 'padre4',
      id_centro: 1,
    },
  ];

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.controller = 'centro';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getCentros(): Observable<CentroDTO[]> {
    const rol = this.localStorageService.get('roles');
    const user_id = this.localStorageService.get('user_id');
    let centros: CentroDTO[] = [];
    if (rol == 'admin') {
      centros = this.centros;
    } else {
      const centros_usuario = this.usuariosCentros.filter(
        (usCe) => usCe.login == user_id
      );
      centros = this.centros.filter((cen) =>
        centros_usuario.some((usce) => usce.id_centro == cen.id)
      );
    }
    return of(centros);
  }

  getCentro(): Observable<CentroDTO> {
    const rol = this.localStorageService.get('roles');
    const user_id = this.localStorageService.get('user_id');
    let centro: CentroDTO = {
      id: 99,
      nombre: '',
      descripcion: '',
      direccion: '',
      telefono: 99,
      imagen: '',
    };
    if (rol != 'admin') {
      const centros_usuario = this.usuariosCentros.filter(
        (usCe) => usCe.login == user_id
      );
      centro = this.centros.filter((cen) =>
        centros_usuario.some((usce) => usce.id_centro == cen.id)
      )[0];
    }
    return of(centro);
  }

  createCentro(centro: CentroDTO): Observable<CentroDTO> {
    this.centros.push(centro);
    return of(centro);
  }

  updateCentro(centro: CentroDTO): Observable<CentroDTO> {
    let c: CentroDTO | undefined = this.centros.find(
      (cs) => cs.id == centro.id
    );

    if (c) {
      c.nombre = centro.nombre;
      c.descripcion = centro.descripcion;
      c.direccion = centro.direccion;
      c.telefono = centro.telefono;
      c.imagen = centro.imagen;

      this.centros = [...this.centros.filter((cen) => cen.id !== centro.id)];
      this.centros.push(c);
    }

    return of(centro);
  }

  deleteCentro(centroId: number): Observable<boolean> {
    this.centros = [...this.centros.filter((cen) => cen.id !== centroId)];
    return of(true);
  }
}
