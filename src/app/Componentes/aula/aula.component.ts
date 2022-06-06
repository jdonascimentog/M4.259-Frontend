import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlimentacionDTO } from 'src/app/Modelos/alimentacion.dto';
import { AulaDTO } from 'src/app/Modelos/aula.dto';
import { InfanteDTO } from 'src/app/Modelos/infante.dto';
import { LibroDTO } from 'src/app/Modelos/libro.dto';
import { PreguntaDTO } from 'src/app/Modelos/pregunta.dto';
import { UsuarioDTO } from 'src/app/Modelos/usuario.dto';
import { AulaService } from 'src/app/Servicios/aula.service';
import { InfanteService } from 'src/app/Servicios/infante.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
})
export class AulaComponent implements OnInit {
  aula!: AulaDTO;
  infantes: InfanteDTO[] = [];
  infante!: InfanteDTO;
  libro!: LibroDTO;
  alimentacion: AlimentacionDTO[] = [];
  padres: UsuarioDTO[] = [];

  id_aula: number = 0;

  editingInfante: boolean = false;
  creatingInfante: boolean = false;
  additionalInfante: boolean = false;
  creatingAlimentacion: boolean = false;

  nombre: FormControl;
  fecha_nac: FormControl;
  infanteForm: FormGroup;

  desayuno: FormControl;
  almuerzo: FormControl;
  comida: FormControl;
  merienda: FormControl;
  alimentacionForm: FormGroup;

  tiposResultadosAlimentacion: { value: number; text: string }[] = [
    { value: -1, text: 'No asiste' },
    { value: 0, text: 'No ha querido comer' },
    { value: 1, text: 'Sólo lo ha probado' },
    { value: 2, text: 'Ha comido un poco' },
    { value: 3, text: 'Ha probado de todo un poco' },
    { value: 4, text: 'Casi se lo come todo' },
    { value: 5, text: 'Se lo ha comido todo. Muy bien.' },
  ];

  constructor(
    private aulaService: AulaService,
    private route: ActivatedRoute,
    private infanteService: InfanteService,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.id_aula = +route.snapshot.params['id'] ?? 0;
    this.nombre = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
    ]);

    this.fecha_nac = new FormControl('', [Validators.required]);

    this.infanteForm = this.formBuilder.group({
      nombre: this.nombre,
      fecha_nac: this.fecha_nac,
    });

    this.desayuno = new FormControl('', []);
    this.almuerzo = new FormControl('', []);
    this.comida = new FormControl('', []);
    this.merienda = new FormControl('', []);

    this.alimentacionForm = this.formBuilder.group({
      desayuno: this.desayuno,
      almuerzo: this.almuerzo,
      comida: this.comida,
      merienda: this.merienda,
    });
  }

  ngOnInit(): void {
    if (this.id_aula > 0) {
      this.aulaService.getAulaById(this.id_aula).subscribe({
        next: (aula: AulaDTO) => {
          this.aula = aula;
          this.cargarInfantes();
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.aulaService.getAula().subscribe({
        next: (aula: AulaDTO) => {
          this.aula = aula;
          this.cargarInfantes();
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  cargarInfantes(): void {
    if (this.id_aula > 0) {
      this.infanteService.getInfantesByAulaParent(this.aula.id).subscribe({
        next: (infantes: InfanteDTO[]) => (this.infantes = infantes),
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.infanteService.getInfantesByAulaEducador(this.aula.id).subscribe({
        next: (infantes: InfanteDTO[]) => (this.infantes = infantes),
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }

  limpiarFormulario(): void {
    this.infanteForm.reset();
  }
  guardarInfante(): void {
    this.infante.nombre = this.nombre.value;
    this.infante.fecha_nac = this.fecha_nac.value;
    this.infante.id_aula = this.aula.id;
    this.infante.id_centro = this.aula.id_centro;

    if (this.creatingInfante) {
      this.infanteService.createInfante(this.infante).subscribe({
        next: (infante: InfanteDTO) => {
          if (infante.id) {
            this.cargarInfantes();
            this.volverListado();
          }
        },
        error: (error: any) => console.error(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.infanteService.updateInfante(this.infante).subscribe({
        next: (infante: InfanteDTO) => {
          if (infante.id) {
            this.cargarInfantes();
            this.volverListado();
          }
        },
        error: (error: any) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  crearInfante(): void {
    this.limpiarFormulario();
    this.infante = {
      id: 0,
      nombre: '',
      fecha_nac: new Date(),
      id_aula: this.aula.id,
      id_centro: this.aula.id_centro,
    };
    this.creatingInfante = true;
  }

  editarInfante(infante: InfanteDTO): void {
    this.limpiarFormulario();
    this.infante = infante;
    this.nombre.setValue(infante.nombre);
    this.fecha_nac.setValue(formatDate(infante.fecha_nac, 'yyyy-MM-dd', 'es'));
    this.editingInfante = true;
  }

  eliminarInfante(infanteId: number): void {
    this.infanteService.deleteInfante(infanteId).subscribe({
      next: (resultado: boolean) => {
        if (resultado) {
          this.cargarInfantes();
        }
      },
      error: (error: any) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
  getAlimentacion(): void {
    this.alimentacion = [];
    this.infanteService.getInfoInfanteAlimentacion(this.infante.id).subscribe({
      next: (ali: AlimentacionDTO[]) => (this.alimentacion = ali),
      error: (error: any) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
  getLibro(): void {
    this.infanteService.getInfoInfanteLibro(this.infante.id).subscribe({
      next: (li: LibroDTO) => (this.libro = li),
      error: (error: any) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
  getPadres(): void {
    this.padres = [];
    this.infanteService.getInfoInfantePadres(this.infante.id).subscribe({
      next: (logins: string[]) =>
        logins.forEach((login) =>
          this.usuarioService.getUsuarioByLogin(login).subscribe({
            next: (usu: UsuarioDTO) => this.padres.push(usu),
            error: (error: any) => console.error(error),
            complete: () => console.info('complete'),
          })
        ),
    });
  }
  adicionalInfante(infante: InfanteDTO): void {
    this.infante = infante;
    this.getAlimentacion();
    this.getLibro();
    this.getPadres();

    this.additionalInfante = true;
  }

  crearAlimentacion(): void {
    this.creatingAlimentacion = true;
  }
  guardarAlimentacion(): void {
    let alimentacion: AlimentacionDTO = {
      id: 0,
      id_infante: this.infante.id,
      fecha: new Date(),
      desayuno_val: this.desayuno.value,
      desayuno_des: this.tiposResultadosAlimentacion.some(
        (f) => f.value == this.desayuno.value
      )
        ? this.tiposResultadosAlimentacion.filter(
            (f) => f.value == this.desayuno.value
          )[0].text
        : '',
      almuerzo_val: this.almuerzo.value,
      almuerzo_des: this.tiposResultadosAlimentacion.some(
        (f) => f.value == this.almuerzo.value
      )
        ? this.tiposResultadosAlimentacion.filter(
            (f) => f.value == this.almuerzo.value
          )[0].text
        : '',
      comida_val: this.comida.value,
      comida_des: this.tiposResultadosAlimentacion.some(
        (f) => f.value == this.comida.value
      )
        ? this.tiposResultadosAlimentacion.filter(
            (f) => f.value == this.comida.value
          )[0].text
        : '',
      merienda_val: this.merienda.value,
      merienda_des: this.tiposResultadosAlimentacion.some(
        (f) => f.value == this.merienda.value
      )
        ? this.tiposResultadosAlimentacion.filter(
            (f) => f.value == this.merienda.value
          )[0].text
        : '',
    };

    this.infanteService.createInfoAlimentacion(alimentacion).subscribe({
      next: (ali: AlimentacionDTO) => this.getAlimentacion(),
      error: (error: any) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
  guardarRespuesta(pregunta: PreguntaDTO, respuesta: string): void {
    pregunta.respuesta = respuesta;
    this.infanteService.createRespuestaInfanteLibro(pregunta).subscribe({
      next: (pregunta: PreguntaDTO) => this.getLibro(),
      error: (error: any) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
  volverListado(): void {
    this.editingInfante = false;
    this.creatingInfante = false;
    this.additionalInfante = false;
  }
  volverListadoAlimentacion(): void {
    this.creatingAlimentacion = false;
  }
}
