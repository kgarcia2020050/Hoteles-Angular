import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    localStorage.clear()
  }

  public secciones: Array<string> = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];


}
