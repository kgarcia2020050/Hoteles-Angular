import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BusquedaPipe } from './pipes/busqueda.pipe';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { NavbarVistasComponent } from './components/navbar-vistas/navbar-vistas.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
import { GraficaHotelesComponent } from './components/grafica-hoteles/grafica-hoteles.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { EventosComponent } from './components/eventos/eventos.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { RouterHotelComponent } from './components/router-hotel/router-hotel.component';
import { EditarComponent } from './components/editar/editar.component';

import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { RouterUsuarioComponent } from './components/router-usuario/router-usuario.component';
import { VerHotelComponent } from './components/ver-hotel/ver-hotel.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ListaHotelesComponent } from './components/lista-hoteles/lista-hoteles.component';
import { HotelEspecificoComponent } from './components/hotel-especifico/hotel-especifico.component';


const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: 'enabled'
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    NavbarComponent,
    RegistroComponent,
    BusquedaPipe,
    HotelesComponent,
    AdministracionComponent,
    NavbarVistasComponent,
    UsuariosRegistradosComponent,
    GraficaHotelesComponent,
    EventosComponent,
    PruebaComponent,
    RouterHotelComponent,
    EditarComponent,
    RouterUsuarioComponent,
    VerHotelComponent,
    EdicionComponent,
    FacturaComponent,
    ListaHotelesComponent,
    HotelEspecificoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule,ChartsModule,NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
