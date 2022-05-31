import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CentroDTO } from '../Modelos/centro.dto';

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
      descripcion: '',
      direccion: 'Calle prueba',
      telefono: 99,
      imagen: '',
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

  constructor(private http: HttpClient) {
    this.controller = 'centro';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getCentros(): Observable<CentroDTO[]> {
    return of(this.centros);
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
