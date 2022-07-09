import { Component, OnInit } from '@angular/core';
import { Entidad } from 'src/app/models/entidad.model';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [LoginService],
})
export class RegistroComponent implements OnInit {
  public postModelo: Entidad;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.postModelo = new Entidad('', '', '', '', '', '', 0, '', 0, '');
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  postUsuarios() {
    this._loginService.registroUsuarios(this.postModelo).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Te has registrado exitosamente',
        }).then((redireccionar) => {
          this._router.navigate(['/login']);
        });
      },
      (error) => {
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: error.error.Error,
        });
      }
    );
  }
}
