import { EventoDTO } from './evento.dto';

export interface AgendaDTO {
  id: number;
  id_centro: number;
  id_aula: number;
  titulo: string;
  imagen: '';
  eventos: EventoDTO[];
}
