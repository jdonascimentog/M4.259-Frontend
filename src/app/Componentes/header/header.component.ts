import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/Modelos/header-menus.dto';
import { HeaderMenusService } from 'src/app/Servicios/header-menus.service';
import { LocalStorageService } from 'src/app/Servicios/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );
  }

  isInRol(rol: string): boolean {
    const roles = rol.split('|');
    return roles.some((role) => this.localStorageService.containsRol(role));
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  usuarios(): void {
    this.router.navigateByUrl('usuarios');
  }

  bandeja(): void {
    this.router.navigateByUrl('bandeja');
  }

  aula(): void {
    this.router.navigateByUrl('aula');
  }

  logout(): void {
    this.localStorageService.remove('user_id');
    this.localStorageService.remove('access_token');
    this.localStorageService.remove('roles');

    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };

    this.headerMenusService.headerManagement.next(headerInfo);

    this.router.navigateByUrl('home');
  }
}
