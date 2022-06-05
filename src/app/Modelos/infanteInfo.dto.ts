import { AlimentacionDTO } from './alimentacion.dto';
import { LibroDTO } from './libro.dto';

export interface InfanteInfoDTO {
  id: number;
  nombre: string;
  fecha_nac: Date;
  id_centro: number;
  id_aula: number;
  alimentacion: AlimentacionDTO[];
  libro: LibroDTO;
}
