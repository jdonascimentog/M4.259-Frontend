import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioDTO } from 'src/app/Modelos/usuario.dto';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';
import { UsuarioService } from 'src/app/Servicios/usuario.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: UsuarioDTO[] = [];
  user!: UsuarioDTO;
  editingUser: boolean = false;
  creatingUser: boolean = false;

  email: FormControl;
  login: FormControl;
  password: FormControl;
  telefono: FormControl;
  tipo: FormControl;
  userForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.login = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.telefono = new FormControl('', [Validators.required]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.tipo = new FormControl([]);

    this.userForm = this.formBuilder.group({
      email: this.email,
      telefono: this.telefono,
      login: this.login,
      password: this.password,
      tipo: this.tipo,
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (users: UsuarioDTO[]) => {
        this.users = users;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }

  limpiarFormulario(): void {
    this.userForm.reset();
  }

  guardarUsuario(): void {
    this.user.email = this.email.value;
    this.user.login = this.login.value;
    this.user.telefono = this.telefono.value;
    this.user.rol = this.tipo.value;
    if (this.password.value) {
      this.user.password = this.password.value;
    }
    if (this.creatingUser) {
      this.usuarioService.createUsuario(this.user).subscribe({
        next: (usuario: UsuarioDTO) => {
          if (usuario.id) {
            this.cargarUsuarios();
            this.volverListado();
          }
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    } else {
      this.usuarioService.updateUsuario(this.user).subscribe({
        next: (usuario: UsuarioDTO) => {
          if (usuario.id) {
            this.cargarUsuarios();
            this.volverListado();
          }
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    }
  }

  crearUsuario(): void {
    this.user = {
      id: 0,
      login: '',
      telefono: 0,
      email: '',
      password: '',
      rol: '',
    };
    this.limpiarFormulario();
    this.creatingUser = true;
  }
  editarUsuario(usuario: UsuarioDTO): void {
    this.limpiarFormulario();
    this.user = usuario;
    this.email.setValue(usuario.email);
    this.login.setValue(usuario.login);
    this.telefono.setValue(usuario.telefono);
    this.tipo.setValue(usuario.rol);
    this.editingUser = true;
  }

  eliminarUsuario(usuarioId: number): void {
    this.usuarioService.deleteUsuario(usuarioId).subscribe({
      next: (resultado: boolean) => {
        if (resultado) {
          this.cargarUsuarios();
        }
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  volverListado(): void {
    this.editingUser = false;
    this.creatingUser = false;
  }
}
