import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthToken } from 'src/app/Modelos/auth-token.dto';
import { AuthDTO } from 'src/app/Modelos/auth.dto';
import { HeaderMenus } from 'src/app/Modelos/header-menus.dto';
import { AuthService } from 'src/app/Servicios/auth.service';
import { HeaderMenusService } from 'src/app/Servicios/header-menus.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginUser = new AuthDTO('', '', '', '', '');

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService
      .login(this.loginUser)
      .pipe(
        finalize(async () => {
          if (responseOK) {
            const headerInfo: HeaderMenus = {
              showAuthSection: true,
              showNoAuthSection: false,
            };
            this.headerMenusService.headerManagement.next(headerInfo);
            this.router.navigateByUrl('home');
          }
        })
      )
      .subscribe(
        (resp: AuthToken) => {
          responseOK = true;
          this.loginUser.user_id = resp.user_id;
          this.loginUser.access_token = resp.access_token;
          this.loginUser.roles = resp.rol;

          this.localStorageService.set('user_id', this.loginUser.user_id);
          this.localStorageService.set(
            'access_token',
            this.loginUser.access_token
          );
          this.localStorageService.set('roles', this.loginUser.roles);
        },
        (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;
          const headerInfo: HeaderMenus = {
            showAuthSection: false,
            showNoAuthSection: true,
          };
          this.headerMenusService.headerManagement.next(headerInfo);

          console.error(error.error);
        }
      );
  }
}
