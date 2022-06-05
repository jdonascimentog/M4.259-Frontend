import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  containsRol(rol: string): boolean {
    let roles = this.get('roles');
    const contieneRol: boolean = roles?.split('|')?.includes(rol) ?? false;
    return contieneRol;
  }
}
