import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Entidad } from 'src/app/models/entidad.model';
import { Habitacion } from 'src/app/models/habitacion';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Eventos } from 'src/app/models/eventos';
import { Servicio } from 'src/app/models/servicio';

@Component({
  selector: 'app-hotel-especifico',
  templateUrl: './hotel-especifico.component.html',
  styleUrls: ['./hotel-especifico.component.css'],
  providers: [UsuarioService],
})
export class HotelEspecificoComponent implements OnInit {
  public getIdHotel: Entidad;
  public getIdCuartos: Habitacion;
  public getIdCuarto: Habitacion;
  public getEventosModel: Eventos;
  public page: Number;
  public pagina: Number;
  constructor(
    private _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.getIdHotel = new Entidad('', '', '', '', '', '', 0, '', 0, '');
    this.getIdCuarto = new Habitacion('', '', '', 0, true, '', 0, '', '');
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.verHotel(dataRuta.get('ID'));
      this.getEventos(dataRuta.get('ID'));
      // this.getServiciosHotel(dataRuta.get('ID'));
    });
  }

  verHotel(id) {
    this._usuarioService.hotelEspecifico(id).subscribe({
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
    this._usuarioService.eventosDelHotel(idHotel).subscribe({
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
