import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { AdministracionService } from 'src/app/services/administracion.service';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { Eventos } from 'src/app/models/eventos';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
  providers: [LoginService, HotelService, AdministracionService],
})
export class AgregarComponent implements OnInit {
  public postModeloEvento: Eventos;
  public token;
  public postModelo: Entidad;
  public identidad;
  constructor(
    private _adminService: AdministracionService,
    private _loginService: LoginService,
    private _router: Router,
    private _hotelService: HotelService
  ) {
    this.postModelo = new Entidad(
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      0,
      ''
    );
    this.postModeloEvento = new Eventos('', '', '', '', '','');
    this.token = this._loginService.obtenerToken();
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {}

  postHotel(agregarHotel) {
    this._adminService.nuevoHotel(this.postModelo, this.token).subscribe({
      next: (response: any) => {
        agregarHotel.reset();
        this._router.navigate(['/principal/administracion']);
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      },
    });
  }

  postEventos(agregarHotel) {
    this._hotelService
      .agregarEvento(this.postModeloEvento, this.token)
      .subscribe({
        next: (response: any) => {
          agregarHotel.reset();
          this._router.navigate(['/routerHotel/eventos']);
        },
        error: (error: any) => {
          Swal.fire({
            icon:"error",
            title:"Error",
            text:error.error.Error,
          })
        },
      });
  }
}
