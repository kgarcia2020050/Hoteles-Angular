import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router) {}

  toInicio() {
    document.getElementById('hero').scrollIntoView();
  }

  toAbout() {
    document.getElementById('about').scrollIntoView();
  }

  toServices() {
    document.getElementById('services').scrollIntoView();
  }

  toHoteles() {
    this._router.navigate(['/listadoHoteles']);
  }

  ngOnInit(): void {}
}
