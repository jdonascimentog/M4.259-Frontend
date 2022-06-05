import { Component, OnInit } from '@angular/core';
import { CentroDTO } from 'src/app/Modelos/centro.dto';
import { CentroService } from 'src/app/Servicios/centro.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';

@Component({
  selector: 'app-centro-portada',
  templateUrl: './centro-portada.component.html',
  styleUrls: ['./centro-portada.component.scss'],
})
export class CentroPortadaComponent implements OnInit {
  centro!: CentroDTO;
  constructor(
    private centroService: CentroService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.centroService.getCentro().subscribe({
      next: (centro: CentroDTO) => {
        this.centro = centro;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }
}
