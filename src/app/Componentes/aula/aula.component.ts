import { Component, OnInit } from '@angular/core';
import { AulaDTO } from 'src/app/Modelos/aula.dto';
import { AulaService } from 'src/app/Servicios/aula.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.scss'],
})
export class AulaComponent implements OnInit {
  aula!: AulaDTO;
  infantes: any[] = [];
  constructor(
    private aulaService: AulaService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.aulaService.getAula().subscribe({
      next: (aula: AulaDTO) => {
        this.aula = aula;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }

  crearInfante(): void {}

  editarInfante(infante: any): void {}

  eliminarInfante(id: any): void {}
}
