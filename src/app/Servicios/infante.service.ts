import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AlimentacionDTO } from '../Modelos/alimentacion.dto';
import { AulaDTO } from '../Modelos/aula.dto';
import { InfanteDTO } from '../Modelos/infante.dto';
import { LibroDTO } from '../Modelos/libro.dto';
import { PreguntaDTO } from '../Modelos/pregunta.dto';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InfanteService {
  private urlServicio: string;
  private controller: string;
  private aula!: AulaDTO;
  private infantes: InfanteDTO[] = [
    {
      id: 1,
      nombre: 'Infante1',
      fecha_nac: new Date(2020, 3, 24),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 2,
      nombre: 'Infante2',
      fecha_nac: new Date(2020, 5, 14),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 3,
      nombre: 'Infante3',
      fecha_nac: new Date(2020, 0, 10),
      id_centro: 1,
      id_aula: 1,
    },
    {
      id: 4,
      nombre: 'Infante4',
      fecha_nac: new Date(2020, 7, 2),
      id_centro: 1,
      id_aula: 1,
    },
  ];
  private alimentacion: AlimentacionDTO[] = [
    {
      id: 1,
      id_infante: 1,
      fecha: new Date(2022, 5, 13),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 2,
      id_infante: 1,
      fecha: new Date(2022, 5, 14),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 4,
      comida_des: 'Casi se lo come todo',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 3,
      id_infante: 1,
      fecha: new Date(2022, 5, 15),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 4,
      id_infante: 1,
      fecha: new Date(2022, 5, 16),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 3,
      almuerzo_des: 'Ha probado de todo un poco',
      comida_val: 3,
      comida_des: 'Ha probado de todo un poco',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 5,
      id_infante: 1,
      fecha: new Date(2022, 5, 17),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 6,
      id_infante: 2,
      fecha: new Date(2022, 5, 13),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 7,
      id_infante: 2,
      fecha: new Date(2022, 5, 14),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 4,
      comida_des: 'Casi se lo come todo',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 8,
      id_infante: 2,
      fecha: new Date(2022, 5, 15),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 9,
      id_infante: 2,
      fecha: new Date(2022, 5, 16),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 4,
      comida_des: 'Casi se lo come todo',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 10,
      id_infante: 2,
      fecha: new Date(2022, 5, 17),
      desayuno_val: 5,
      desayuno_des: '',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 11,
      id_infante: 3,
      fecha: new Date(2022, 5, 13),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: -1,
      comida_des: '',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 12,
      id_infante: 3,
      fecha: new Date(2022, 5, 14),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: -1,
      comida_des: '',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 13,
      id_infante: 3,
      fecha: new Date(2022, 5, 15),
      desayuno_val: 4,
      desayuno_des: 'Casi se lo come todo',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: -1,
      comida_des: '',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 14,
      id_infante: 3,
      fecha: new Date(2022, 5, 16),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: -1,
      comida_des: '',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 15,
      id_infante: 3,
      fecha: new Date(2022, 5, 17),
      desayuno_val: 5,
      desayuno_des: 'Se lo ha comido todo. Muy bien.',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: -1,
      comida_des: '',
      merienda_val: -1,
      merienda_des: '',
    },
    {
      id: 16,
      id_infante: 4,
      fecha: new Date(2022, 5, 13),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: 5,
      merienda_des: 'Se lo ha comido todo. Muy bien.',
    },
    {
      id: 17,
      id_infante: 4,
      fecha: new Date(2022, 5, 14),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 4,
      comida_des: 'Casi se lo come todo',
      merienda_val: 4,
      merienda_des: 'Casi se lo come todo',
    },
    {
      id: 18,
      id_infante: 4,
      fecha: new Date(2022, 5, 15),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 5,
      almuerzo_des: 'Se lo ha comido todo. Muy bien.',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: 5,
      merienda_des: 'Se lo ha comido todo. Muy bien.',
    },
    {
      id: 19,
      id_infante: 4,
      fecha: new Date(2022, 5, 16),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 5,
      comida_des: 'Se lo ha comido todo. Muy bien.',
      merienda_val: 5,
      merienda_des: 'Se lo ha comido todo. Muy bien.',
    },
    {
      id: 20,
      id_infante: 4,
      fecha: new Date(2022, 5, 17),
      desayuno_val: -1,
      desayuno_des: '',
      almuerzo_val: 4,
      almuerzo_des: 'Casi se lo come todo',
      comida_val: 4,
      comida_des: 'Casi se lo come todo',
      merienda_val: 5,
      merienda_des: 'Se lo ha comido todo. Muy bien.',
    },
  ];

  private libros: LibroDTO[] = [
    {
      id: 1,
      id_infante: 1,
      nombre: 'Libro de Infante1',
      descripcion: 'Libro de seguimiento de Infante1',
      imagen: '',
      fecha_creacion: new Date(2021, 8, 13),
      preguntas: [
        {
          id: 1,
          id_libro: 1,
          pregunta: '¿Cómo ha sido su adaptación a la escuela?',
          tipo: 0,
          respuesta: 'Se ha adaptado muy bien.',
          fecha_respuesta: new Date(),
        },
        {
          id: 2,
          id_libro: 1,
          pregunta: '¿Cómo es su relación con los compañeros?',
          tipo: 0,
          respuesta: 'Tiene una relación muy buena.',
          fecha_respuesta: new Date(),
        },
        {
          id: 3,
          id_libro: 1,
          pregunta: '¿Cómo vuelve a casa?',
          tipo: 1,
          respuesta: '',
          fecha_respuesta: new Date(),
        },
      ],
    },
    {
      id: 2,
      id_infante: 2,
      nombre: 'Libro de Infante2',
      descripcion: 'Libro de seguimiento de Infante2',
      imagen: '',
      fecha_creacion: new Date(2021, 8, 13),
      preguntas: [
        {
          id: 4,
          id_libro: 2,
          pregunta: '¿Cómo ha sido su adaptación a la escuela?',
          tipo: 0,
          respuesta: 'Se ha adaptado despacio pero bien.',
          fecha_respuesta: new Date(),
        },
        {
          id: 5,
          id_libro: 2,
          pregunta: '¿Cómo es su relación con los compañeros?',
          tipo: 0,
          respuesta:
            'Tiene una relación muy buena con alguno de sus compañeros.',
          fecha_respuesta: new Date(),
        },
        {
          id: 6,
          id_libro: 2,
          pregunta: '¿Cómo vuelve a casa?',
          tipo: 1,
          respuesta: '',
          fecha_respuesta: new Date(),
        },
      ],
    },
    {
      id: 3,
      id_infante: 3,
      nombre: 'Libro de Infante3',
      descripcion: 'Libro de seguimiento de Infante3',
      imagen: '',
      fecha_creacion: new Date(2021, 8, 13),
      preguntas: [
        {
          id: 7,
          id_libro: 3,
          pregunta: '¿Cómo ha sido su adaptación a la escuela?',
          tipo: 0,
          respuesta: 'Se ha adaptado muy bien.',
          fecha_respuesta: new Date(),
        },
        {
          id: 8,
          id_libro: 3,
          pregunta: '¿Cómo es su relación con los compañeros?',
          tipo: 0,
          respuesta:
            'Suele jugar con su pequeño grupo pero se relaciona bien con el resto.',
          fecha_respuesta: new Date(),
        },
        {
          id: 8,
          id_libro: 3,
          pregunta: '¿Cómo vuelve a casa?',
          tipo: 1,
          respuesta: '',
          fecha_respuesta: new Date(),
        },
      ],
    },
    {
      id: 4,
      id_infante: 4,
      nombre: 'Libro de Infante4',
      descripcion: 'Libro de seguimiento de Infante4',
      imagen: '',
      fecha_creacion: new Date(2021, 8, 13),
      preguntas: [
        {
          id: 9,
          id_libro: 4,
          pregunta: '¿Cómo ha sido su adaptación a la escuela?',
          tipo: 0,
          respuesta: 'Le ha costado los primeros meses pero lo ha conseguido.',
          fecha_respuesta: new Date(),
        },
        {
          id: 10,
          id_libro: 4,
          pregunta: '¿Cómo es su relación con los compañeros?',
          tipo: 0,
          respuesta: 'Tiene una relación buena.',
          fecha_respuesta: new Date(),
        },
        {
          id: 11,
          id_libro: 4,
          pregunta: '¿Cómo vuelve a casa?',
          tipo: 1,
          respuesta: '',
          fecha_respuesta: new Date(),
        },
      ],
    },
  ];

  private usuarioInfante: {
    id_usuario: number;
    id_infante: number;
    login: string;
  }[] = [
    {
      id_usuario: 6,
      id_infante: 1,
      login: 'madre1',
    },
    {
      id_usuario: 7,
      id_infante: 2,
      login: 'madre2',
    },
    {
      id_usuario: 8,
      id_infante: 2,
      login: 'padre3',
    },
    {
      id_usuario: 7,
      id_infante: 3,
      login: 'madre2',
    },
    {
      id_usuario: 8,
      id_infante: 3,
      login: 'padre3',
    },
    {
      id_usuario: 9,
      id_infante: 4,
      login: 'padre4',
    },
  ];

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.controller = 'infantes';
    this.urlServicio = 'http://localhost:3000/' + this.controller;
  }

  getInfantesByAulaEducador(id: number): Observable<InfanteDTO[]> {
    let infantes = this.infantes.filter((infante) => infante.id_aula == id);
    return of(infantes);
  }

  getInfantesByAulaParent(id: number): Observable<InfanteDTO[]> {
    const user_id = this.localStorageService.get('user_id');
    let infantes = this.infantes.filter(
      (infante) =>
        infante.id_aula == id &&
        this.usuarioInfante.some(
          (usInf) => usInf.id_infante == infante.id && usInf.login == user_id
        )
    );
    return of(infantes);
  }

  createInfante(infante: InfanteDTO): Observable<InfanteDTO> {
    const id = Math.max(...this.infantes.map((o) => o.id)) + 1;
    const id_libro = Math.max(...this.libros.map((o) => o.id)) + 1;
    infante.id = id;
    this.infantes.push(infante);
    const libro: LibroDTO = {
      id: id_libro,
      id_infante: id,
      nombre: 'Libro de ' + infante.nombre,
      descripcion: 'Libro de seguimiento de ' + infante.nombre,
      imagen: '',
      fecha_creacion: new Date(),
      preguntas: [],
    };
    this.libros.push(libro);
    return of(infante);
  }

  updateInfante(infante: InfanteDTO): Observable<InfanteDTO> {
    let a: InfanteDTO | undefined = this.infantes.find(
      (i) => i.id == infante.id
    );

    if (a) {
      a.nombre = infante.nombre;
      a.fecha_nac = infante.fecha_nac;

      this.infantes = [...this.infantes.filter((inf) => inf.id !== infante.id)];
      this.infantes.push(a);
    }

    return of(infante);
  }

  deleteInfante(infanteId: number): Observable<boolean> {
    this.infantes = [...this.infantes.filter((inf) => inf.id !== infanteId)];
    this.libros = [...this.libros.filter((li) => li.id_infante !== infanteId)];
    this.usuarioInfante = [
      ...this.usuarioInfante.filter((uInf) => uInf.id_infante !== infanteId),
    ];
    return of(true);
  }

  getInfoInfanteAlimentacion(infanteId: number): Observable<AlimentacionDTO[]> {
    const alimentacion = this.alimentacion.filter(
      (ali) => ali.id_infante == infanteId
    );
    return of(alimentacion);
  }

  createInfoAlimentacion(
    alimentacion: AlimentacionDTO
  ): Observable<AlimentacionDTO> {
    const id = Math.max(...this.alimentacion.map((o) => o.id)) + 1;
    alimentacion.id = id;
    this.alimentacion.push(alimentacion);
    return of(alimentacion);
  }

  getInfoInfanteLibro(infanteId: number): Observable<LibroDTO> {
    const libro = this.libros.filter((li) => li.id_infante == infanteId)[0];
    return of(libro);
  }

  createPreguntaInfanteLibro(pregunta: PreguntaDTO): Observable<PreguntaDTO> {
    const id_preguntas = this.libros.map((a) =>
      Math.max(...a.preguntas.map((b) => b.id))
    );
    const id = Math.max(...id_preguntas.map((o) => o)) + 1;
    pregunta.id = id;
    let libro = this.libros.find((l) => l.id == pregunta.id_libro);
    if (libro) {
      libro.preguntas.push(pregunta);
    }
    return of(pregunta);
  }

  createRespuestaInfanteLibro(pregunta: PreguntaDTO): Observable<PreguntaDTO> {
    let libro = this.libros.find((l) => l.id == pregunta.id_libro);
    if (libro) {
      let preg = libro.preguntas.find((p) => p.id == pregunta.id);
      if (preg) {
        preg.respuesta = pregunta.respuesta;
        preg.fecha_respuesta = new Date();
      }
    }
    return of(pregunta);
  }

  getInfoInfantePadres(infanteId: number): Observable<string[]> {
    const padres = this.usuarioInfante
      .filter((usu) => usu.id_infante == infanteId)
      .map(function (usuario) {
        return usuario.login;
      });
    return of(padres);
  }

  createUsuarioInfante(
    infanteId: number,
    usuarioId: number,
    usuarioLogin: string
  ): Observable<boolean> {
    const usuarioInfante = this.usuarioInfante.find(
      (uInf) =>
        uInf.id_infante == infanteId &&
        uInf.id_usuario == usuarioId &&
        uInf.login == usuarioLogin
    );

    if (!usuarioInfante) {
      this.usuarioInfante.push({
        id_infante: infanteId,
        id_usuario: usuarioId,
        login: usuarioLogin,
      });
      return of(true);
    }

    return of(false);
  }

  deleteUsuarioInfante(
    infanteId: number,
    usuarioId: number,
    usuarioLogin: string
  ): Observable<boolean> {
    this.usuarioInfante = [
      ...this.usuarioInfante.filter(
        (inf) =>
          inf.id_infante !== infanteId &&
          inf.id_usuario !== usuarioId &&
          inf.login !== usuarioLogin
      ),
    ];
    return of(true);
  }

  getAulasParents(login: string): number[] {
    const infantes = this.usuarioInfante
      .filter((usu) => usu.login == login)
      .map(function (usuario) {
        return usuario.id_infante;
      });
    const aulasInfantes = this.infantes
      .filter((inf) => infantes.some((i) => i == inf.id))
      .map(function (au) {
        return au.id_aula;
      });

    return aulasInfantes;
  }
}
