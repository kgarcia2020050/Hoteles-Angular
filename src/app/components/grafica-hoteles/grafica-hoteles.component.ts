import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { AdministracionService } from 'src/app/services/administracion.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-grafica-hoteles',
  templateUrl: './grafica-hoteles.component.html',
  styleUrls: ['./grafica-hoteles.component.css'],
  providers: [LoginService, AdministracionService],
})
export class GraficaHotelesComponent implements OnInit {

  chartOptions = {
    responsive: true,
  };

  chartLabels: any = [];
  chartData: any = [];
  chartColors: any = [
    {
      backgroundColor: [],
    },
  ];
  chartLegend = true;
  chartPlugins = [];

  public solicitadosModel: any[];

  constructor(
    public _adminService: AdministracionService,
    public _loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getSolicitados();
  }

  getSolicitados() {
    this._adminService
      .masSolicitados(this._loginService.obtenerToken())
      .subscribe({
        next: (response: any) => {
          this.solicitadosModel = response.Hoteles_solicitados;
          this.solicitadosModel.forEach((dato) => {
            this.chartLabels.push(dato.nombre);
            this.chartData.push(dato.solicitado);
            this.chartColors[0].backgroundColor.push(
              `#${Math.floor(Math.random() * 16777215).toString(16)}`
            );
          });
        },
      });
  }
}
