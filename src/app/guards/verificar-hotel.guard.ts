import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerificarHotelGuard implements CanActivate {
  public identidad;

  constructor(public _router: Router) {}
  canActivate() {
    if (this.obtenerIdentidad().rol !== 'HOTEL') {
      this._router.navigate(['/inicio']);
      return false;
    } else if (this.obtenerIdentidad() == null) {
      this._router.navigate(['/inicio']);
      return false;
    }

    return true;
  }

  obtenerIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if (identidad2 != undefined) {
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

}
