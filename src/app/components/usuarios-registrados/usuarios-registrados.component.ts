import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css'],
  providers: [AdministracionService, LoginService],
})
export class UsuariosRegistradosComponent implements OnInit {
  public getModelo: Entidad;
  public token;
  

  constructor(
    private _adminService: AdministracionService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this.usuariosRegistrados( )
  }

  usuariosRegistrados() {
    this._adminService.usuariosRegistrados(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Usuarios;
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
