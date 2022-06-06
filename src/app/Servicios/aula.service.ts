import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AulaDTO } from '../Modelos/aula.dto';
import { CentroDTO } from '../Modelos/centro.dto';
import { CentroService } from './centro.service';
import { InfanteService } from './infante.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  private urlServicio: string;
  private controller: string;
  private centro!: CentroDTO;
  private aulas: AulaDTO[] = [
    {
      id: 1,
      id_centro: 1,
      nombre: 'Panda',
      descripcion: 'Clase de los pandas',
      imagen:
        'https://pixabay.com/get/g382099ee208683df6fb77184c3a0cc1ec5cada8d3bb156deab82b94943b7695713b39a2ffe55fce3749cdec127723d34ca8aeffab6492a244093719306e0cbcb7db4e57c2976b1e7b225bd480d2127cb_1280.png',
    },
  ];

  private usuariosAula: {
    id_usuario: number;
    login: string;
    id_aula: number;
  }[] = [
    {
      id_usuario: 4,
      login: 'educador1',
      id_aula: 1,
    },
    {
      id_usuario: 5,
      login: 'educador2',
      id_aula: 1,
    },
  ];

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private infanteService: InfanteService,
    private centroService: CentroService
  ) {
    this.controller = 'aulas';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
    this.centroService.getCentro().subscribe({
      next: (cen: CentroDTO) => {
        this.centro = cen;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  getAulas(): Observable<AulaDTO[]> {
    const user_id = this.localStorageService.get('user_id') ?? '';
    let aulas: AulaDTO[] = [];

    if (this.localStorageService.containsRol('admin_centro')) {
      aulas = this.aulas.filter((aula) => aula.id_centro == this.centro.id);
    } else if (this.localStorageService.containsRol('educador')) {
      const aulas_usuario = this.usuariosAula.filter(
        (auUS) => auUS.login == user_id
      );
      aulas = this.aulas.filter((au) =>
        aulas_usuario.some((usua) => usua.id_aula == au.id)
      );
    } else if (this.localStorageService.containsRol('usuario')) {
      const aulasInfantes = this.infanteService.getAulasParents(user_id);
      aulas = this.aulas.filter((au) =>
        aulasInfantes.some((usua) => usua == au.id)
      );
    }
    return of(aulas);
  }

  getAula(): Observable<AulaDTO> {
    const rol = this.localStorageService.get('roles');
    const user_id = this.localStorageService.get('user_id');
    let aula: AulaDTO = {
      id: 99,
      id_centro: -1,
      nombre: '',
      descripcion: '',
      imagen: '',
    };
    if (rol == 'educador') {
      const aulas_usuario = this.usuariosAula.filter(
        (usAu) => usAu.login == user_id
      );
      aula = this.aulas.filter((au) =>
        aulas_usuario.some((usua) => usua.id_aula == au.id)
      )[0];
    }
    return of(aula);
  }

  getAulaInstancia(): AulaDTO {
    const rol = this.localStorageService.get('roles');
    const user_id = this.localStorageService.get('user_id');
    let aula: AulaDTO = {
      id: 99,
      id_centro: -1,
      nombre: '',
      descripcion: '',
      imagen: '',
    };
    if (rol == 'educador') {
      const aulas_usuario = this.usuariosAula.filter(
        (usAu) => usAu.login == user_id
      );
      aula = this.aulas.filter((au) =>
        aulas_usuario.some((usua) => usua.id_aula == au.id)
      )[0];
    }
    return aula;
  }

  getAulaById(id: number): Observable<AulaDTO> {
    let aula = this.aulas.filter((au) => au.id == id)[0];

    return of(aula);
  }

  createAula(aula: AulaDTO): Observable<AulaDTO> {
    aula.id_centro = this.centro.id;
    const id = Math.max(...this.aulas.map((o) => o.id)) + 1;
    aula.id = id;
    this.aulas.push(aula);
    //this.agendaService.createAgendaAula(aula.id_centro, aula.id);
    return of(aula);
  }

  updateAula(aula: AulaDTO): Observable<AulaDTO> {
    let a: AulaDTO | undefined = this.aulas.find((au) => au.id == aula.id);

    if (a) {
      a.nombre = aula.nombre;
      a.descripcion = aula.descripcion;
      a.imagen = aula.imagen;

      this.aulas = [...this.aulas.filter((aul) => aul.id !== aula.id)];
      this.aulas.push(a);
    }

    return of(aula);
  }

  deleteAula(aulaId: number): Observable<boolean> {
    this.aulas = [...this.aulas.filter((aul) => aul.id !== aulaId)];
    return of(true);
  }
}
