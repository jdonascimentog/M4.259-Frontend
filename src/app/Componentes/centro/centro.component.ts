import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CentroDTO } from 'src/app/Modelos/centro.dto';
import { CentroService } from 'src/app/Servicios/centro.service';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.scss'],
})
export class CentroComponent implements OnInit {
  centros: CentroDTO[] = [];
  centro!: CentroDTO;
  editingCenter: boolean = false;
  creatingCenter: boolean = false;

  nombre: FormControl;
  descripcion: FormControl;
  direccion: FormControl;
  telefono: FormControl;
  imagen: FormControl;
  centroForm: FormGroup;

  constructor(
    private centroService: CentroService,
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

    this.direccion = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.telefono = new FormControl('', [Validators.required]);

    this.imagen = new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.centroForm = this.formBuilder.group({
      nombre: this.nombre,
      descripcion: this.descripcion,
      direccion: this.direccion,
      telefono: this.telefono,
      imagen: this.imagen,
    });
  }

  ngOnInit(): void {
    this.cargarCentros();
  }

  cargarCentros(): void {
    this.centroService.getCentros().subscribe({
      next: (centros: CentroDTO[]) => {
        this.centros = centros;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  guardarCentro(): void {
    this.centro.nombre = this.nombre.value;
    this.centro.descripcion = this.descripcion.value;
    this.centro.direccion = this.direccion.value;
    this.centro.telefono = this.telefono.value;
    this.centro.imagen = this.imagen.value;

    if (this.creatingCenter) {
      this.centroService.createCentro(this.centro).subscribe({
        next: (centro: CentroDTO) => {
          if (centro.id) {
            this.cargarCentros();
            this.volverListado();
          }
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.centroService.updateCentro(this.centro).subscribe({
        next: (centro: CentroDTO) => {
          if (centro.id) {
            this.cargarCentros();
            this.volverListado();
          }
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  crearCentro(): void {
    this.centro = {
      id: 0,
      nombre: '',
      descripcion: '',
      direccion: '',
      telefono: 0,
      imagen: '',
    };
    this.creatingCenter = true;
  }

  editarCentro(centro: CentroDTO): void {
    this.centro = centro;
    this.nombre.setValue(centro.nombre);
    this.descripcion.setValue(centro.descripcion);
    this.direccion.setValue(centro.direccion);
    this.telefono.setValue(centro.telefono);
    this.imagen.setValue(centro.imagen);
    this.editingCenter = true;
  }

  eliminarCentro(centroId: number): void {
    this.centroService.deleteCentro(centroId).subscribe({
      next: (resultado: boolean) => {
        if (resultado) {
          this.cargarCentros();
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  volverListado(): void {
    this.editingCenter = false;
    this.creatingCenter = false;
  }
}
