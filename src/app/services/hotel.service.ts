import { Injectable } from '@angular/core'; //Inyecta los datos al servicio para que se puedan manejar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion';
import { LoginService } from './login.service';
import { Eventos } from '../models/eventos';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  public identidad;

  constructor(public _http: HttpClient, public _loginService: LoginService) {
    this.identidad = JSON.parse(localStorage.getItem('identidad'));
  }

  verHabitaciones(token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHabitaciones/' + ID, {
      headers: headersToken,
    });
  }

  agregarHabitacion(modeloCuarto: Habitacion, token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloCuarto);
    return this._http.post(this.url + '/nuevoCuarto/' + ID, parametros, {
      headers: headersToken,
    });
  }

  cuartoPorId(ID: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verCuarto/' + ID, {
      headers: headersToken,
    });
  }

  misEventos(token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/misEventos/' + ID, {
      headers: headersToken,
    });
  }

  borrarServicio(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/borrarServicio/' + id, {
      headers: headersToken,
    });
  }

  agregarEvento(modelo: Eventos, token): Observable<any> {
    var ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.post(this.url + '/nuevoEvento/' + ID, parametros, {
      headers: headersToken,
    });
  }

  borrarEvento(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/borrarEvento/' + id, {
      headers: headersToken,
    });
  }

  editarCuarto(modelo: Habitacion, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.put(
      this.url + '/editarCuarto/' + modelo._id,
      parametros,
      { headers: headersToken }
    );
  }

  misServicios(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let ID = this.identidad._id;
    return this._http.get(this.url + '/misServicios/' + ID, {
      headers: headersToken,
    });
  }

  nuevoServicio(modelo: Servicio, token): Observable<any> {
    let ID = this.identidad._id;
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.post(this.url + '/agregarServicio/' + ID, parametros, {
      headers: headersToken,
    });
  }
}
