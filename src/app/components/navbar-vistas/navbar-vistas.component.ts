import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-vistas',
  templateUrl: './navbar-vistas.component.html',
  styleUrls: ['./navbar-vistas.component.css']
})
export class NavbarVistasComponent implements OnInit {
  public identidad;

  constructor() {
    this.identidad=JSON.parse(localStorage.getItem('identidad'));
  }

  ngOnInit(): void {
  }

}
