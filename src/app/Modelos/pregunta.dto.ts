export interface PreguntaDTO {
  id: number;
  id_libro: number;
  pregunta: string;
  tipo: number;
  respuesta: string;
  fecha_respuesta: Date;
}
