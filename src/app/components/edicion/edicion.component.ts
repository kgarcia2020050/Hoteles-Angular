import { Component, OnInit } from '@angular/core';

import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import { Habitacion } from 'src/app/models/habitacion';

import { HotelService } from 'src/app/services/hotel.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css'],
  providers: [LoginService, HotelService],
})
export class EdicionComponent implements OnInit {
  public token;
  public getIdCuarto: Habitacion;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    public _activatedRoute: ActivatedRoute,
    public _hotelService: HotelService
  ) {
    this.getIdCuarto = new Habitacion('', '','', 0, true, '', 0, '', '');
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.verHabitacion(dataRuta.get('ID'));
    });
  }

  putHabitacion() {
    this._hotelService.editarCuarto(this.getIdCuarto, this.token).subscribe({
      next: (response: any) => {
        this._router.navigate(['/routerHotel/hoteles']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  verHabitacion(idCuarto) {
    this._hotelService.cuartoPorId(idCuarto, this.token).subscribe({
      next: (response: any) => {
        this.getIdCuarto = response.Cuarto;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
