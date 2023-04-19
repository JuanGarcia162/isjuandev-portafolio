import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';


@NgModule({
  declarations: [
    SkillsPageComponent
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule
  ]
})
export class SkillsModule { }
