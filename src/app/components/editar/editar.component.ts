import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Entidad } from 'src/app/models/entidad.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

import { Habitacion } from 'src/app/models/habitacion';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [UsuarioService, LoginService],
})
export class EditarComponent implements OnInit {
  public getIdModelo: Entidad;

  public identidad;
  public getHabitacion: Habitacion;
  public token;
  public libres;
  public getHistorial: [{}];
  public compras: any;
  public factura: any;

  public total: Number;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdModelo = new Entidad('', '', '', '', '', '', 0, '', 0, '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getPerfilId(dataRuta.get('ID'));
      this.misReservaciones(dataRuta.get('ID'));
    });
  }

  verFactura(idUsuario) {
    this._usuarioService.verFactura(idUsuario, this.token).subscribe({
      next: (response: any) => {
        this.factura = response.Compras;
        this.compras = response.Compras.factura;
        this.total = this.factura.total;
      },
    });
  }

  getPerfilId(idPerfil) {
    this._usuarioService.perfilId(idPerfil, this.token).subscribe({
      next: (response: any) => {
        this.getIdModelo = response.Perfil;
        this.libres = this.getIdModelo.cuartos;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  misReservaciones(idUsuario) {
    this._usuarioService.reservaciones(idUsuario, this.token).subscribe({
      next: (response: any) => {
        this.getHabitacion = response.Reservas;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  cancelar(idCuarto) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cancelas esta reservación, otra persona podrá tomar la habitación.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, cancelar.',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Reservación cancelada',
        });
        this._usuarioService
          .cancelarReservacion(idCuarto, this.token)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              this._activatedRoute.paramMap.subscribe((dataRuta) => {
                this.getPerfilId(dataRuta.get('ID'));
                this.misReservaciones(dataRuta.get('ID'));
              });
            },
            error: (error: any) => {
              console.log(error);
            },
          });
      }
    });
  }

  putPerfil() {
    this._usuarioService.editarPerfil(this.getIdModelo, this.token).subscribe({
      next: (response: any) => {
        if (this.getIdModelo.rol == 'HOTEL') {
          this._router.navigate(['/routerHotel/hoteles']);
        } else if (this.getIdModelo.rol == 'ADMIN') {
          this._router.navigate(['/principal/administracion']);
        } else if (this.getIdModelo.rol == 'USUARIO') {
          this._router.navigate(['/routerUsuario/verHoteles']);
        }
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  eliminarPerfil() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si eliminas tu cuenta, toda su información se perderá.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar cuenta',
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.borrarPerfil(this.token).subscribe({
          next: (response: any) => {
            this._router.navigate(['/inicio']);
          },
          error: (error: any) => {
            Swal.fire({
              icon: 'error',
              title: error.error.Error,
            });
          },
        });
      }
    });
  }

  pagar(idUsuario) {
    this._usuarioService.pagar(idUsuario, this.token).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Pagos realizados',
        });
        this.getPerfilId(idUsuario);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          text: error.error.Error,
        });
      },
    });
  }

  historial(idUsuario) {
    this._usuarioService.verHistorial(idUsuario, this.token).subscribe({
      next: (response: any) => {
        this.getHistorial = response.Historial.historial;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
