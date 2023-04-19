import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperiencePageComponent } from './pages/experience-page/experience-page.component';



@NgModule({
  declarations: [
    ExperiencePageComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule
  ]
})
export class ExperienceModule { }
