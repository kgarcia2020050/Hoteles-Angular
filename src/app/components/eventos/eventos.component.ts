import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HotelService } from 'src/app/services/hotel.service';
import { Eventos } from 'src/app/models/eventos';
import Swal from 'sweetalert2';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  providers: [LoginService, HotelService],
})
export class EventosComponent implements OnInit {
  public token;
  public getEventosModel: Eventos;
  public identidad;
  public getServicioHotel: Servicio;

  public postServicios: Servicio;

  constructor(
    private _loginService: LoginService,
    private _hotelService: HotelService
  ) {
    this.postServicios = new Servicio('', '', '', 0, '');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this.getEventos();
    this.getServicios();
  }

  getServicios() {
    this._hotelService.misServicios(this.token).subscribe({
      next: (response: any) => {
        this.getServicioHotel = response.Servicios;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getEventos() {
    this._hotelService.misEventos(this.token).subscribe({
      next: (response: any) => {
        this.getEventosModel = response.Eventos;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  postServicio(services) {
    this._hotelService.nuevoServicio(this.postServicios, this.token).subscribe({
      next: (response: any) => {
        services.reset();
        this.getServicios();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  deleteServicio(idServicio) {
    Swal.fire({
      title: 'Eliminar servicio',
      text: 'Si eliminas este servicio, las personas que lo hayan adquirido aun podran tener sus beneficios',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._hotelService.borrarServicio(idServicio, this.token).subscribe({
          next: (response: any) => {
            this.getServicios();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }

  deleteEvento(idEvento) {
    Swal.fire({
      title: 'Eliminar evento',
      text: '¿Estas seguro de eliminar este evento?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._hotelService.borrarEvento(idEvento, this.token).subscribe({
          next: (response: any) => {
            this.getEventos();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }
}
