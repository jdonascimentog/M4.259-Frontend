import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AulaDTO } from 'src/app/Modelos/aula.dto';
import { AulaService } from 'src/app/Servicios/aula.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.scss'],
})
export class AulasComponent implements OnInit {
  aulas: AulaDTO[] = [];
  aula!: AulaDTO;

  editingAula: boolean = false;
  creatingAula: boolean = false;

  nombre: FormControl;
  descripcion: FormControl;
  imagen: FormControl;
  aulaForm: FormGroup;

  constructor(
    private aulaService: AulaService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.nombre = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.descripcion = new FormControl('', [
      Validators.required,
      Validators.maxLength(512),
    ]);

    this.imagen = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.aulaForm = this.formBuilder.group({
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
    });
  }

  ngOnInit(): void {
    this.cargarAulas();
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }

  cargarAulas(): void {
    this.aulaService.getAulas().subscribe({
      next: (aulas: AulaDTO[]) => {
        this.aulas = aulas;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }
  limpiarFormulario(): void {
    this.aulaForm.reset();
  }
  guardarAula(): void {
    this.aula.nombre = this.nombre.value;
    this.aula.descripcion = this.descripcion.value;
    this.aula.imagen = this.imagen.value;

    if (this.creatingAula) {
      this.aulaService.createAula(this.aula).subscribe({
        next: (aula: AulaDTO) => {
          if (aula.id) {
            this.cargarAulas();
            this.volverListado();
          }
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.aulaService.updateAula(this.aula).subscribe({
        next: (aula: AulaDTO) => {
          if (aula.id) {
            this.cargarAulas();
            this.volverListado();
          }
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  crearAula(): void {
    this.limpiarFormulario();
    this.aula = {
      id: 0,
      id_centro: 0,
      nombre: '',
      descripcion: '',
      imagen: '',
    };
    this.creatingAula = true;
  }

  editarAula(aula: AulaDTO): void {
    this.limpiarFormulario();
    this.aula = aula;
    this.nombre.setValue(aula.nombre);
    this.descripcion.setValue(aula.descripcion);
    this.imagen.setValue(aula.imagen);
    this.editingAula = true;
  }

  eliminarAula(aulaId: number): void {
    this.aulaService.deleteAula(aulaId).subscribe({
      next: (resultado: boolean) => {
        if (resultado) {
          this.cargarAulas();
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  volverListado(): void {
    this.editingAula = false;
    this.creatingAula = false;
  }
}
