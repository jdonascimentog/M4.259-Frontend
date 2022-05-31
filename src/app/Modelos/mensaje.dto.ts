export interface MensajeDTO {
  id: number;
  mensaje: string;
  id_remitente: number;
  login_remitente: string;
  id_destino: number;
  login_destino: string;
  fecha: Date;
}
