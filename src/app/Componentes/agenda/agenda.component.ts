import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
  DAYS_OF_WEEK,
} from 'angular-calendar';
import { AgendaDTO } from 'src/app/Modelos/agenda.dto';
import { EventoDTO } from 'src/app/Modelos/evento.dto';
import { AgendaService } from 'src/app/Servicios/agenda.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { CustomEventTitleFormatter } from './custom-event-title-formatter';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  locale: string = 'es';
  dayStartHour: number = 8;
  dayEndHour: number = 18;
  hourSegments: number = 2;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  disablePrev: boolean = false;
  disableNext: boolean = false; // is false
  view: CalendarView = CalendarView.Week;
  agendas: AgendaDTO[] = [];
  creatingEvento: boolean = false;

  titulo: FormControl;
  tipo: FormControl;
  fecha_inicio: FormControl;
  fecha_fin: FormControl;
  eventoForm: FormGroup;

  colores: { primary: string; secondary: string }[] = [
    {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
    {
      primary: '#239B56',
      secondary: '#D5F5E3',
    },
  ];

  tiposEventos: { value: number; text: string }[] = [
    { value: 0, text: 'Actividad del centro' },
    { value: 1, text: 'Especialidad en el aula' },
    { value: 2, text: 'Evento especial en el aula' },
    { value: 3, text: 'Evento para los padres' },
  ];

  constructor(
    private agendaService: AgendaService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.titulo = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
    ]);

    this.tipo = new FormControl('', []);

    this.fecha_inicio = new FormControl('', [Validators.required]);
    this.fecha_fin = new FormControl('', [Validators.required]);

    this.eventoForm = this.formBuilder.group({
      titulo: this.titulo,
      tipo: this.tipo,
      fecha_inicio: this.fecha_inicio,
      fecha_fin: this.fecha_fin,
    });
  }

  ngOnInit(): void {
    this.cargarAgendas();
  }

  cargarAgendas(): void {
    this.agendaService.getAgendas().subscribe({
      next: (ag: AgendaDTO[]) => {
        this.agendas = ag;
        this.formateaEventos();
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }

  crearEvento(): void {
    this.creatingEvento = true;
  }
  guardarEvento(): void {
    let id_agenda = 0;
    if (this.localStorageService.containsRol('admin_centro')) {
      id_agenda = this.agendas.filter((a) => a.id_aula == 0)[0].id;
    } else if (this.localStorageService.containsRol('educador')) {
      id_agenda = this.agendas.filter((a) => a.id_aula != 0)[0].id;
    }
    let evento: EventoDTO = {
      id: 0,
      id_agenda: id_agenda,
      titulo: this.titulo.value,
      tipo: this.tipo.value,
      fecha_inicio: new Date(this.fecha_inicio.value),
      fecha_fin: new Date(this.fecha_fin.value),
    };

    this.agendaService.createEvent(evento).subscribe({
      next: (ev: EventoDTO) => {
        this.cargarAgendas();
        this.volver();
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
    this.creatingEvento = false;
  }
  volver(): void {
    this.creatingEvento = false;
  }

  formateaEventos(): void {
    this.events = [];
    this.agendas.forEach((a) => {
      a.eventos.forEach((ev) => {
        let evento: CalendarEvent = {
          start: ev.fecha_inicio,
          end: ev.fecha_fin,
          title: ev.titulo,
          color: this.colores[ev.tipo],
          meta: { id: ev.id, id_agenda: ev.id_agenda },
        };
        if (
          this.localStorageService.containsRol('admin_centro') &&
          a.id_aula == 0
        ) {
          evento.actions = [
            {
              label: '<i class="fa-solid fa-trash-can"></i>',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.deleteEvento(event.meta.id, event.meta.id_agenda);
              },
            },
          ];
        } else if (
          this.localStorageService.containsRol('educador') &&
          a.id_aula != 0
        ) {
          evento.actions = [
            {
              label: '<i class="fa-solid fa-trash-can"></i>',
              onClick: ({ event }: { event: CalendarEvent }): void => {
                this.deleteEvento(event.meta.id, event.meta.id_agenda);
              },
            },
          ];
        }
        this.events.push(evento);
      });
    });
  }

  deleteEvento(id_evento: number, id_agenda: number): void {
    this.agendaService.deleteEvent(id_agenda, id_evento).subscribe({
      next: (resultado: boolean) => this.cargarAgendas(),
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {}
}
