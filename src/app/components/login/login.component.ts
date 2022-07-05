import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  public modelo: Entidad;

  public identidad;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.modelo = new Entidad('', '', '', '', '', '', 0, '', 0,'');
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {}

  getToken() {
    this._loginService.login(this.modelo, 'true').subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.Token);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  obtenerTokenPromesa(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._loginService.login(this.modelo, 'true').subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.Token);
          resolve(response);
        },
        error: (error: any) => {
          console.log(<any>error);
        },
      });
    });
  }

  login() {
    this._loginService.login(this.modelo).subscribe({
      next: (response: any) => {
        this.obtenerTokenPromesa().then((respuesta) => {
          localStorage.setItem(
            'identidad',
            JSON.stringify(response.Inicio_exitoso)
          );
          if (response.Inicio_exitoso.rol == 'ADMIN') {
            this._router.navigate(['/principal/administracion']);
          } else if (response.Inicio_exitoso.rol == 'USUARIO') {
            this._router.navigate(['/routerUsuario/verHoteles']);
          } else if (response.Inicio_exitoso.rol == 'HOTEL') {
            this._router.navigate(['/routerHotel/hoteles']);
          } else {
            this._router.navigate(['/inicio']);
          }
        });
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }
}
