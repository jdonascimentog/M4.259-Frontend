import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderMenus } from '../Modelos/header-menus.dto';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenusService {
  headerManagement: BehaviorSubject<HeaderMenus> =
    new BehaviorSubject<HeaderMenus>({
      showAuthSection: false,
      showNoAuthSection: true,
    });
}
