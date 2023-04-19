import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  mainMenu:
  {defaultOptions: Array<any>, accesLink: Array<any>}
  ={defaultOptions: [], accesLink: []}

  customOptions: Array<any> = []


  constructor(){}

  ngOnInit(): void
  {
    this.mainMenu.defaultOptions =
    [
      {
        name: 'Sobre Mí',
        icon: 'bx-user',
        router: ['/about']
      },
      {
        name: 'Portafolio',
        icon: 'bx-briefcase-alt',
        router: ['/','portfolio']
      },
      {
        name: 'Experiencia',
        icon: 'bx-user-plus',
        router: ['/','experience']
      },
      {
        name: 'Aptitudes',
        icon: 'bx-book-alt',
        router: ['/','skills']
      },
    ]
  }
}
