import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Entidad } from 'src/app/models/entidad.model';
import { Habitacion } from 'src/app/models/habitacion';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Eventos } from 'src/app/models/eventos';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-ver-hotel',
  templateUrl: './ver-hotel.component.html',
  styleUrls: ['./ver-hotel.component.css'],
  providers: [LoginService, UsuarioService],
})
export class VerHotelComponent implements OnInit {
  public getIdHotel: Entidad;
  public getIdCuartos: Habitacion;
  public getIdCuarto: Habitacion;
  public getEventosModel: Eventos;
  public page: Number;
  public pagina: Number;

  public getServicios: Servicio;

  public token;
  public dias: any;

  public identidad;

  public precio: any;
  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdHotel = new Entidad('', '', '', '', '', '', 0, '', 0, '');
    this.getIdCuarto = new Habitacion('', '', '', 0, true, '', 0, '', '');
    this.token = this._loginService.obtenerToken();
    this.dias = 0;
    this.precio = 0;
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.getHotel(dataRuta.get('ID'));
      this.getEventos(dataRuta.get('ID'));
      this.getServiciosHotel(dataRuta.get('ID'));
    });
  }

  getHabitacion(idCuarto) {
    this._usuarioService.verHabitacion(idCuarto, this.token).subscribe({
      next: (response: any) => {
        this.getIdCuarto = response.Cuarto;
        this.precio = this.getIdCuarto.precio;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getServiciosHotel(idHotel) {
    this._usuarioService.serviciosHotel(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.getServicios = response.Servicios;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  comprarServicio(idHotel, idServicio) {
    Swal.fire({
      title: 'Comprar servicio',
      text: 'Se agregara el cargo a tu factura',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService
          .comprarServicio(idHotel, idServicio, this.token)
          .subscribe({
            next: (response: any) => {
              console.log(response);
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

  cuartoOcupado() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Esta habitación se encuentra reservada.',
    });
  }

  pagarCuarto(idCuarto, pagarCuarto, dias) {
    this._usuarioService.pagarHabitacion(idCuarto, dias, this.token).subscribe({
      next: (response: any) => {
        pagarCuarto.reset();
        Swal.fire({
          icon: 'success',
          title: 'Habitacion rentada.',
        });
        this._activatedRoute.paramMap.subscribe((dataRuta) => {
          this.getHotel(dataRuta.get('ID'));
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

  getHotel(idHotel) {
    this._usuarioService.verHotel(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.getIdHotel = response.Hotel;
        this.getIdCuartos = response.habitaciones;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getEventos(idHotel) {
    this._usuarioService.eventosHotel(idHotel, this.token).subscribe({
      next: (response: any) => {
        this.getEventosModel = response.Eventos;
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
