import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [UsuarioService, LoginService],
})
export class FacturaComponent implements OnInit {
  public identidad;
  public token;

  public factura: any;
  public compras: any;

  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
    this.token = this._loginService.obtenerToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.verFactura(dataRuta.get('ID'));
    });
  }

  verFactura(idUsuario) {
    this._usuarioService.verFactura(idUsuario, this.token).subscribe({
      next: (response: any) => {
        this.factura = response.Compras;
        this.compras = response.Compras.factura;
      },
    });
  }

  pagar(idUsuario) {
    this._usuarioService.pagar(idUsuario, this.token).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Pagos realizados',
        }).then((respuesta) => {
          this._router.navigate(['/routerUsuario/verHoteles']);
        });
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          text: error.error.Error,
        });
      },
    });
  }
}
