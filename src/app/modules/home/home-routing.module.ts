import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =
[
  {
    path: 'about',
    loadChildren: () => import ('@modules/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import ('@modules/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'experience',
   loadChildren: () => import ('@modules/experience/experience.module').then(m => m.ExperienceModule)
  },
  {
    path: 'skills',
    loadChildren: () => import ('@modules/skills/skills.module').then(m => m.SkillsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
