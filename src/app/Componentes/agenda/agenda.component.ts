import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent,
  DAYS_OF_WEEK,
} from 'angular-calendar';
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
  disablePrev: boolean = true;
  disableNext: boolean = true; // is false
  view: CalendarView = CalendarView.Week;
  constructor() {}

  ngOnInit(): void {}

  detalle(e: any) {
    let evento = e.event.meta.evento;
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {}
}
