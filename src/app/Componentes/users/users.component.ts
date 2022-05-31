import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsuarioDTO } from 'src/app/Modelos/usuario.dto';
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
  userForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
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

    this.userForm = this.formBuilder.group({
      email: this.email,
      telefono: this.telefono,
      login: this.login,
      password: this.password,
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

  guardarUsuario(): void {
    this.user.email = this.email.value;
    this.user.login = this.login.value;
    this.user.telefono = this.telefono.value;
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
    };
    this.creatingUser = true;
  }
  editarUsuario(usuario: UsuarioDTO): void {
    this.user = usuario;
    this.email.setValue(usuario.email);
    this.login.setValue(usuario.login);
    this.telefono.setValue(usuario.telefono);
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
