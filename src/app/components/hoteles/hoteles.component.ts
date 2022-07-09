import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/models/habitacion';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { HotelService } from 'src/app/services/hotel.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Entidad } from 'src/app/models/entidad.model';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
  providers: [HotelService, LoginService, UsuarioService],
})
export class HotelesComponent implements OnInit {
  public getModelo: Habitacion;
  public token;
  public postModelo: Habitacion;
  public getIdCuarto: Habitacion;
  public cuartosDisponibles: any;
  public cuartosOcupados: any;

  getUsuario: Entidad;

  public hOcupados;
  public hDisponibles;

  public search;
  constructor(
    private _hotelService: HotelService,
    private _loginService: LoginService,
    private _usuarioService: UsuarioService
  ) {
    this.getUsuario = new Entidad('', '', '', '', '', '', 0, '', 0, '');
    this.postModelo = new Habitacion('', '', '', 0, true, '', 0, '', '');
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this.habitaciones();
  }

  habitaciones() {
    this._hotelService.verHabitaciones(this.token).subscribe({
      next: (response: any) => {
        this.getModelo = response.Mis_habitaciones;
        this.disponibles();
        this.reservadas();
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  verUsuario(idUsuario) {
    this._usuarioService.perfilId(idUsuario, this.token).subscribe({
      next: (response: any) => {
        this.getUsuario = response.Perfil;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  disponibles() {
    this._hotelService.disponibles(this.token).subscribe({
      next: (response: any) => {
        this.cuartosDisponibles = response.Disponibles;
        this.hDisponibles = Object.keys(this.cuartosDisponibles).length;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  reservadas() {
    this._hotelService.reservadas(this.token).subscribe({
      next: (response: any) => {
        this.cuartosOcupados = response.Reservados;
        this.hOcupados = Object.keys(this.cuartosOcupados).length;
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  postHabitacion(agregarCuarto) {
    this._hotelService
      .agregarHabitacion(this.postModelo, this.token)
      .subscribe({
        next: (response: any) => {
          this.habitaciones();
          agregarCuarto.reset();
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
