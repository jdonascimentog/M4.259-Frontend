import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AgendaDTO } from '../Modelos/agenda.dto';
import { EventoDTO } from '../Modelos/evento.dto';
import { AulaService } from './aula.service';
import { CentroService } from './centro.service';
import { InfanteService } from './infante.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  private urlServicio: string;
  private controller: string;
  private agendas: AgendaDTO[] = [
    {
      id: 1,
      id_centro: 1,
      id_aula: 0,
      titulo: 'Agenda del centro',
      imagen: '',
      eventos: [
        {
          id: 1,
          id_agenda: 1,
          titulo: 'Desayuno',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 13, 7, 30),
          fecha_fin: new Date(2022, 5, 13, 8, 30),
        },
        {
          id: 2,
          id_agenda: 1,
          titulo: 'Almuerzo',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 13, 10, 30),
          fecha_fin: new Date(2022, 5, 13, 11, 0),
        },
        {
          id: 3,
          id_agenda: 1,
          titulo: 'Comida',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 13, 13, 30),
          fecha_fin: new Date(2022, 5, 13, 14, 30),
        },
        {
          id: 4,
          id_agenda: 1,
          titulo: 'Merienda',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 13, 16, 30),
          fecha_fin: new Date(2022, 5, 13, 17, 0),
        },
        {
          id: 5,
          id_agenda: 1,
          titulo: 'Desayuno',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 14, 7, 30),
          fecha_fin: new Date(2022, 5, 14, 8, 30),
        },
        {
          id: 6,
          id_agenda: 1,
          titulo: 'Almuerzo',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 14, 10, 30),
          fecha_fin: new Date(2022, 5, 14, 11, 0),
        },
        {
          id: 7,
          id_agenda: 1,
          titulo: 'Comida',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 14, 13, 30),
          fecha_fin: new Date(2022, 5, 14, 14, 30),
        },
        {
          id: 8,
          id_agenda: 1,
          titulo: 'Merienda',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 14, 16, 30),
          fecha_fin: new Date(2022, 5, 14, 17, 0),
        },
        {
          id: 9,
          id_agenda: 1,
          titulo: 'Desayuno',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 15, 7, 30),
          fecha_fin: new Date(2022, 5, 15, 8, 30),
        },
        {
          id: 10,
          id_agenda: 1,
          titulo: 'Almuerzo',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 15, 10, 30),
          fecha_fin: new Date(2022, 5, 15, 11, 0),
        },
        {
          id: 11,
          id_agenda: 1,
          titulo: 'Comida',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 15, 13, 30),
          fecha_fin: new Date(2022, 5, 15, 14, 30),
        },
        {
          id: 12,
          id_agenda: 1,
          titulo: 'Merienda',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 15, 16, 30),
          fecha_fin: new Date(2022, 5, 15, 17, 0),
        },
        {
          id: 13,
          id_agenda: 1,
          titulo: 'Desayuno',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 16, 7, 30),
          fecha_fin: new Date(2022, 5, 16, 8, 30),
        },
        {
          id: 14,
          id_agenda: 1,
          titulo: 'Almuerzo',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 16, 10, 30),
          fecha_fin: new Date(2022, 5, 16, 11, 0),
        },
        {
          id: 15,
          id_agenda: 1,
          titulo: 'Comida',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 16, 13, 30),
          fecha_fin: new Date(2022, 5, 16, 14, 30),
        },
        {
          id: 16,
          id_agenda: 1,
          titulo: 'Merienda',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 16, 16, 30),
          fecha_fin: new Date(2022, 5, 16, 17, 0),
        },
        {
          id: 17,
          id_agenda: 1,
          titulo: 'Desayuno',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 17, 7, 30),
          fecha_fin: new Date(2022, 5, 17, 8, 30),
        },
        {
          id: 18,
          id_agenda: 1,
          titulo: 'Almuerzo',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 17, 10, 30),
          fecha_fin: new Date(2022, 5, 17, 11, 0),
        },
        {
          id: 19,
          id_agenda: 1,
          titulo: 'Comida',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 17, 13, 30),
          fecha_fin: new Date(2022, 5, 17, 14, 30),
        },
        {
          id: 20,
          id_agenda: 1,
          titulo: 'Merienda',
          tipo: 0,
          fecha_inicio: new Date(2022, 5, 17, 16, 30),
          fecha_fin: new Date(2022, 5, 17, 17, 0),
        },
      ],
    },
    {
      id: 2,
      id_centro: 1,
      id_aula: 1,
      titulo: 'Agenda del aula',
      imagen: '',
      eventos: [
        {
          id: 21,
          id_agenda: 1,
          titulo: 'Taller de inglés',
          tipo: 1,
          fecha_inicio: new Date(2022, 5, 13, 12, 0),
          fecha_fin: new Date(2022, 5, 13, 13, 0),
        },
        {
          id: 22,
          id_agenda: 1,
          titulo: 'Juegos de agua. Traed bañador.',
          tipo: 2,
          fecha_inicio: new Date(2022, 5, 14, 11, 30),
          fecha_fin: new Date(2022, 5, 14, 12, 30),
        },
        {
          id: 23,
          id_agenda: 1,
          titulo: 'Marionetas',
          tipo: 1,
          fecha_inicio: new Date(2022, 5, 15, 15, 0),
          fecha_fin: new Date(2022, 5, 15, 16, 0),
        },
        {
          id: 24,
          id_agenda: 1,
          titulo: 'Cuentacuentos',
          tipo: 1,
          fecha_inicio: new Date(2022, 5, 16, 9, 30),
          fecha_fin: new Date(2022, 5, 16, 10, 30),
        },
        {
          id: 25,
          id_agenda: 1,
          titulo: 'Recogida material',
          tipo: 3,
          fecha_inicio: new Date(2022, 5, 17, 15, 0),
          fecha_fin: new Date(2022, 5, 17, 15, 30),
        },
        {
          id: 26,
          id_agenda: 1,
          titulo: 'Recogida material',
          tipo: 3,
          fecha_inicio: new Date(2022, 5, 17, 17, 0),
          fecha_fin: new Date(2022, 5, 17, 17, 30),
        },
      ],
    },
  ];
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private centroService: CentroService,
    private aulaService: AulaService,
    private infanteService: InfanteService
  ) {
    this.controller = 'agenda';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getAgendas(): Observable<AgendaDTO[]> {
    const rol = this.localStorageService.get('roles');
    const user_id = this.localStorageService.get('user_id') ?? '';
    const centro = this.centroService.getCentroInstancia();
    let agendas: AgendaDTO[] = [];
    if (rol == 'admin_centro') {
      agendas = this.agendas.filter(
        (ag) => ag.id_centro == centro.id && ag.id_aula == 0
      );
    } else if (rol == 'educador') {
      const aula = this.aulaService.getAulaInstancia();
      agendas = this.agendas.filter(
        (ag) =>
          ag.id_centro == centro.id &&
          (ag.id_aula == 0 || ag.id_aula == aula.id)
      );
    } else if (rol == 'usuario') {
      const aulas = this.infanteService.getAulasParents(user_id);
      agendas = this.agendas.filter(
        (ag) =>
          ag.id_centro == centro.id &&
          (ag.id_aula == 0 || aulas.some((a) => a == ag.id_aula))
      );
    }
    return of(agendas);
  }

  createAgendaCentro(id_centro: number): void {
    const id = Math.max(...this.agendas.map((o) => o.id)) + 1;
    const agenda: AgendaDTO = {
      id: id,
      id_centro: id_centro,
      id_aula: 0,
      imagen: '',
      titulo: 'Agenda de centro',
      eventos: [],
    };
    this.agendas.push(agenda);
  }

  createAgendaAula(id_centro: number, id_aula: number): void {
    const id = Math.max(...this.agendas.map((o) => o.id)) + 1;
    const agenda: AgendaDTO = {
      id: id,
      id_centro: id_centro,
      id_aula: id_aula,
      imagen: '',
      titulo: 'Agenda de aula',
      eventos: [],
    };
    this.agendas.push(agenda);
  }

  createEvent(evento: EventoDTO): Observable<EventoDTO> {
    let agenda = this.agendas.filter((a) => a.id == evento.id_agenda)[0];
    agenda.eventos.push(evento);
    return of(evento);
  }

  deleteEvent(id_agenda: number, id_evento: number): Observable<boolean> {
    let agenda = this.agendas.filter((a) => a.id == id_agenda)[0];
    agenda.eventos = [...agenda.eventos.filter((e) => e.id !== id_evento)];
    return of(true);
  }
}
