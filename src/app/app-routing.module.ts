import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { UsuariosRegistradosComponent } from './components/usuarios-registrados/usuarios-registrados.component';
import { VerificacionGuard } from './guards/verificacion.guard';
import { GraficaHotelesComponent } from './components/grafica-hoteles/grafica-hoteles.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { RouterHotelComponent } from './components/router-hotel/router-hotel.component';
import { VerificarHotelGuard } from './guards/verificar-hotel.guard';
import { EditarComponent } from './components/editar/editar.component';
import { VerificarUsuarioGuard } from './guards/verificar-usuario.guard';
import { RouterUsuarioComponent } from './components/router-usuario/router-usuario.component';
import { VerHotelComponent } from './components/ver-hotel/ver-hotel.component';
import { EdicionComponent } from './components/edicion/edicion.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { FacturaComponent } from './components/factura/factura.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'routerUsuario',
    component: RouterUsuarioComponent,
    canActivate: [VerificarUsuarioGuard],
    children: [
      { path: 'verHoteles', component: AdministracionComponent },
      { path: 'editar/:ID', component: EditarComponent },
      { path: 'solicitados', component: GraficaHotelesComponent },
      { path: 'verHotel/:ID', component: VerHotelComponent },
      { path: 'consumos/:ID', component: FacturaComponent },
    ],
  },
  {
    path: 'routerHotel',
    component: RouterHotelComponent,
    canActivate: [VerificarHotelGuard],
    children: [
      { path: 'hoteles', component: HotelesComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'editar/:ID', component: EditarComponent },
      { path: 'editarCuarto/:ID', component: EdicionComponent },
      { path: 'agendar/:ID', component: AgregarComponent },
    ],
  },
  {
    path: 'principal',
    component: PruebaComponent,
    canActivate: [VerificacionGuard],
    children: [
      { path: 'administracion', component: AdministracionComponent },
      { path: 'registrados', component: UsuariosRegistradosComponent },
      { path: 'solicitados', component: GraficaHotelesComponent },
      { path: 'editar/:ID', component: EditarComponent },
      { path: 'editarHotel/:ID', component: EdicionComponent },
      { path: 'verHotel/:ID', component: VerHotelComponent },
      { path: 'nuevo', component: AgregarComponent },
    ],
  },

  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
