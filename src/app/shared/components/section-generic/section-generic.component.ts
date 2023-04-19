import { Component, OnInit, Input } from '@angular/core';
import { ProyectoModel } from '@core/models/proyectos.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit{
  @Input() title: string = ''
  @Input() mode: 'big' = 'big'
  @Input() dataProyectos: Array<ProyectoModel> = []

  constructor(){}

  ngOnInit(): void {

  }

}
