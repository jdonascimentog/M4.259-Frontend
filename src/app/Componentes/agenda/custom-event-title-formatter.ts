import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  public override week(event: CalendarEvent): string {
    let title = event.title;
    /*let evento = event.meta.evento;
    let tipo_clase = event.meta.tipo;
    let title = '<div>';
    if (evento.nomAsignatura != null) {
        title += '<p class="texto-calendario text-ellipsis">' + evento.nomAsignatura + ' (' + evento.idAsignatura + ')</p>';
        title += '<p class="texto-calendario text-ellipsis">' + tipo_clase + '</p>';
    }
    title += '</div>';*/
    return `${title}`;
  }

  public override weekTooltip(event: CalendarEvent): string {
    let title = event.title;
    /*let evento = event.meta.evento;
    let title = '<div class="wrapper" style="color:black;background:white">';
    if (evento.nomAsignatura != null) {
        title += '<p class="texto-calendario">' + evento.nomTipo;
        if (evento.grupoPractica!= null) {
            title += '&nbsp;'+ evento.grupoPractica;
        } else if (evento.grupoTeoria!= null) {
            title += '&nbsp;'+ evento.grupoTeoria;
        }
        title += '</p>';
        title += '<p class="texto-calendario">' + evento.nomAsignatura + ' (' + evento.idAsignatura + ')</p>';
    } 
    if (evento.localizacion != null) {
        title += '<p class="texto-calendario">' + evento.localizacion + '</p>'
    }
    title += '</div>';*/
    return title;
  }
}
