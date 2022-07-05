import { Injectable } from '@angular/core'; //Inyecta los datos al servicio para que se puedan manejar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entidad } from '../models/entidad.model';

@Injectable({
  providedIn: 'root',
})
export class AdministracionService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(public _http: HttpClient) {}

  usuariosRegistrados(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/usuariosRegistrados', {
      headers: headersToken,
    });
  }

  hoteles(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/verHoteles', { headers: headersToken });
  }

  nuevoHotel(modeloHotel: Entidad, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modeloHotel);
    return this._http.post(this.url + '/nuevoHotel', parametros, {
      headers: headersToken,
    });
  }

  eliminarHotel(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/borrarHotel/' + id, {
      headers: headersToken,
    });
  }

  masSolicitados(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/masSolicitados', {
      headers: headersToken,
    });
  }

  editarHotel(modelo: Entidad, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelo);
    return this._http.put(this.url + '/editarHotel/' + modelo._id, parametros, {
      headers: headersToken,
    });
  }
}
