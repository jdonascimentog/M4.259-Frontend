import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EstadisticaDTO } from '../Modelos/estadistica.dto';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  private urlServicio: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'estadistica';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getEstadisticas(): Observable<EstadisticaDTO[]> {
    let estadisticas: EstadisticaDTO[] = [
      {
        tipo: 'barras',
        ejeX: 'Años',
        ejeY: 'Total centros creados',
        valores: [
          {
            name: '2018',
            value: 15,
          },
          {
            name: '2019',
            value: 7,
          },
          {
            name: '2020',
            value: 5,
          },
          {
            name: '2021',
            value: 18,
          },
          {
            name: '2022',
            value: 9,
          },
        ],
      },
      {
        tipo: 'barras',
        ejeX: 'Años',
        ejeY: 'Total mensajes enviados',
        valores: [
          {
            name: '2018',
            value: 200,
          },
          {
            name: '2019',
            value: 467,
          },
          {
            name: '2020',
            value: 56,
          },
          {
            name: '2021',
            value: 1433,
          },
          {
            name: '2022',
            value: 366,
          },
        ],
      },
      {
        tipo: 'barras',
        ejeX: 'Años',
        ejeY: 'Total aulas',
        valores: [
          {
            name: '2018',
            value: 76,
          },
          {
            name: '2019',
            value: 23,
          },
          {
            name: '2020',
            value: 19,
          },
          {
            name: '2021',
            value: 160,
          },
          {
            name: '2022',
            value: 44,
          },
        ],
      },
    ];
    return of(estadisticas);
  }
}
