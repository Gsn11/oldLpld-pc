import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';

const ArticleRoutes: Routes = [
  { path: '', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ArticleRoutes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
