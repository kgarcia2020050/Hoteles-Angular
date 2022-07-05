import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { AdministracionService } from 'src/app/services/administracion.service';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  providers: [AdministracionService, LoginService],
})
export class AdministracionComponent implements OnInit {
  public getModelo: Entidad;
  public postModelo: Entidad;
  public getIdModelo: Entidad;
  public token;
  public identidad;
  public search;

  constructor(
    private _adminService: AdministracionService,
    private _loginService: LoginService,
  ) {
    this.postModelo = new Entidad('', '', '', '', '', '', 0, '', 0,'');
    this.token = this._loginService.obtenerToken();
    this.identidad=JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.hoteles();
  }

  hoteles() {
    this._adminService.hoteles(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Hoteles;
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
