import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AulaDTO } from 'src/app/Modelos/aula.dto';
import { InfanteDTO } from 'src/app/Modelos/infante.dto';
import { AulaService } from 'src/app/Servicios/aula.service';
import { InfanteService } from 'src/app/Servicios/infante.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
})
export class AulaComponent implements OnInit {
  aula!: AulaDTO;
  infantes: InfanteDTO[] = [];
  infante!: InfanteDTO;

  editingInfante: boolean = false;
  creatingInfante: boolean = false;
  additionalInfante: boolean = false;

  nombre: FormControl;
  fecha_nac: FormControl;
  infanteForm: FormGroup;
  constructor(
    private aulaService: AulaService,
    private infanteService: InfanteService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
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
  }

  ngOnInit(): void {
    this.aulaService.getAula().subscribe({
      next: (aula: AulaDTO) => {
        this.aula = aula;
        this.cargarInfantes();
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  cargarInfantes(): void {
    this.infanteService.getInfantesByAulaEducador(this.aula.id).subscribe({
      next: (infantes: InfanteDTO[]) => (this.infantes = infantes),
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
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
  adicionalInfante(infante: InfanteDTO): void {
    this.additionalInfante = true;
  }
  volverListado(): void {
    this.editingInfante = false;
    this.creatingInfante = false;
    this.additionalInfante = false;
  }
}
