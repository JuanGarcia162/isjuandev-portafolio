import { Component, OnInit } from '@angular/core';
import { ProyectoModel } from '@core/models/proyectos.model';
import * as dataRaw from '../../../../data/proyectos.json'

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {

  mockProyectosList:Array<ProyectoModel>= []

  constructor(){}

  ngOnInit(): void {
    const {data}: any = (dataRaw as any).default
    this.mockProyectosList = data;
  }
}
