import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AulaDTO } from '../Modelos/aula.dto';
import { InfanteDTO } from '../Modelos/infante.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InfanteService {
  private urlServicio: string;
  private controller: string;
  private aula!: AulaDTO;
  private infantes: InfanteDTO[] = [
    {
      id: 1,
      nombre: 'Infante1',
      fecha_nac: new Date(2020, 3, 24),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 2,
      nombre: 'Infante2',
      fecha_nac: new Date(2020, 5, 14),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 3,
      nombre: 'Infante3',
      fecha_nac: new Date(2020, 0, 10),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 4,
      nombre: 'Infante4',
      fecha_nac: new Date(2020, 7, 2),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 5,
      nombre: 'Infante5',
      fecha_nac: new Date(2020, 10, 26),
      id_centro: 1,
      id_aula: 1,
    },
  ];
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.controller = 'infantes';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getInfantesByAulaEducador(id: number): Observable<InfanteDTO[]> {
    let infantes = this.infantes.filter((infante) => infante.id_aula == id);
    return of(infantes);
  }

  createInfante(infante: InfanteDTO): Observable<InfanteDTO> {
    const id = Math.max(...this.infantes.map((o) => o.id)) + 1;
    infante.id = id;
    this.infantes.push(infante);
    return of(infante);
  }

  updateInfante(infante: InfanteDTO): Observable<InfanteDTO> {
    let a: InfanteDTO | undefined = this.infantes.find(
      (i) => i.id == infante.id
    );

    if (a) {
      a.nombre = infante.nombre;
      a.fecha_nac = infante.fecha_nac;

      this.infantes = [...this.infantes.filter((inf) => inf.id !== infante.id)];
      this.infantes.push(a);
    }

    return of(infante);
  }

  deleteInfante(infanteId: number): Observable<boolean> {
    this.infantes = [...this.infantes.filter((inf) => inf.id !== infanteId)];
    return of(true);
  }
}
