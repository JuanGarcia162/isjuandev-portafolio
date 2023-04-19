import { Component, OnInit, Input } from '@angular/core';
import { ProyectoModel } from '@core/models/proyectos.model';

@Component({
  selector: 'app-card-portfolio',
  templateUrl: './card-portfolio.component.html',
  styleUrls: ['./card-portfolio.component.css']
})
export class CardPortfolioComponent implements OnInit{
  @Input() mode: 'big' = 'big';
  @Input() proyecto: ProyectoModel = { id: 0, name: '',cover:'', enlace:'',tecno1:'',tecno2:'',tecno3:'',tecno4:'',repo:'' };

  constructor(){}

  ngOnInit(): void {
  }

}
