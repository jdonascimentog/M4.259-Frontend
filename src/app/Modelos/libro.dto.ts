import { PreguntaDTO } from './pregunta.dto';

export interface LibroDTO {
  id: number;
  id_infante: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  fecha_creacion: Date;
  preguntas: PreguntaDTO[];
}
