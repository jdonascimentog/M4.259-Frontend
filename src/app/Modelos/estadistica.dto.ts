import { valorEstadisiticaDTO } from './valor-estadistica.dto';

export interface EstadisticaDTO {
  tipo: string;
  ejeX: string;
  ejeY: string;
  valores: valorEstadisiticaDTO[];
}
