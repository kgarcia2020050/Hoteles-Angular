import { Component, OnInit } from '@angular/core';

import { AdministracionService } from 'src/app/services/administracion.service';

import { Entidad } from 'src/app/models/entidad.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-hoteles',
  templateUrl: './lista-hoteles.component.html',
  styleUrls: ['./lista-hoteles.component.css'],
  providers: [AdministracionService],
})
export class ListaHotelesComponent implements OnInit {
  constructor(
    private _adminService: AdministracionService,
    private _router: Router
  ) {}
  public getModelo: Entidad;
  public search;

  ngOnInit(): void {
    this.listaHoteles();
  }

  listaHoteles() {
    this._adminService.listadoHoteles().subscribe({
      next: (response: any) => {
        this.getModelo = response.Hoteles;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  verHotel(id) {
    this._router.navigate(['hotelEspecifico/' + id]);
  }
}
