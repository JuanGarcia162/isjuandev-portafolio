import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsPageComponent } from './pages/skills-page/skills-page.component';

const routes: Routes =
[
  {path:'',component:SkillsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsRoutingModule { }
