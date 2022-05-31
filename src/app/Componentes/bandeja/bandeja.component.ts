import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MensajeDTO } from 'src/app/Modelos/mensaje.dto';
import { UsuarioDTO } from 'src/app/Modelos/usuario.dto';
import { BandejaService } from 'src/app/Servicios/bandeja.service';

@Component({
  selector: 'app-bandeja',
  templateUrl: './bandeja.component.html',
  styleUrls: ['./bandeja.component.scss'],
})
export class BandejaComponent implements OnInit {
  contactos: UsuarioDTO[] = [];
  contacto!: UsuarioDTO;
  contactoSeleccionado: boolean = false;
  messages: MensajeDTO[] = [];
  messagesSeen: MensajeDTO[] = [];
  message!: MensajeDTO;

  mensaje: FormControl;
  mensajeForm: FormGroup;

  constructor(
    private bandejaService: BandejaService,
    private formBuilder: FormBuilder
  ) {
    this.mensaje = new FormControl('', [
      Validators.required,
      Validators.maxLength(512),
    ]);
    this.mensajeForm = this.formBuilder.group({
      mensaje: this.mensaje,
    });
  }

  ngOnInit(): void {
    this.cargarMensajesContactos();
  }

  cargarMensajesContactos(): void {
    this.bandejaService.getMensajes().subscribe({
      next: (mensajes: MensajeDTO[]) => {
        this.messages = mensajes;
        if (this.contactoSeleccionado) {
          this.messagesSeen = [
            ...this.messages.filter(
              (me) =>
                me.id_destino === this.contacto.id ||
                me.id_remitente === this.contacto.id
            ),
          ];
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });

    this.bandejaService.getContactos().subscribe({
      next: (contactos: UsuarioDTO[]) => {
        this.contactos = contactos;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  seleccionContacto(usuario: UsuarioDTO): void {
    this.contacto = usuario;
    this.contactoSeleccionado = true;
    this.messagesSeen = [
      ...this.messages.filter(
        (me) => me.id_destino === usuario.id || me.id_remitente === usuario.id
      ),
    ];
  }

  numMensajes(usuarioId: number): number {
    let mensajes = [
      ...this.messages.filter(
        (me) => me.id_destino === usuarioId || me.id_remitente === usuarioId
      ),
    ];
    return mensajes.length;
  }

  enviarMensaje(): void {
    let m: MensajeDTO = {
      id_destino: this.contacto.id,
      mensaje: this.mensaje.value,
      fecha: new Date(),
      id_remitente: 0,
      login_destino: this.contacto.login,
      login_remitente: '',
      id: 0,
    };

    this.bandejaService.createMensaje(m).subscribe({
      next: (respuesta: MensajeDTO) => {
        this.cargarMensajesContactos();
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
}
