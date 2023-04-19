import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardPortfolioComponent } from './components/card-portfolio/card-portfolio.component';
import { SectionGenericComponent } from './components/section-generic/section-generic.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    CardPortfolioComponent,
    SectionGenericComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    CardPortfolioComponent,
    SectionGenericComponent
  ]
})
export class SharedModule { }
