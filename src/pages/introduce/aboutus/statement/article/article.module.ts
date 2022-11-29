import { NgModule } from '@angular/core';
import { ArticleRoutingModule } from './article-routing.module';
import { NavModule } from '../../../component/nav/nav.module';
import { WallModule } from '../../../component/wall/wall.module';
import { FooterModule } from '../../../component/footer/footer.module';
import { ArticleComponent } from './article.component';

@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    ArticleRoutingModule,
    NavModule,
    WallModule,
    FooterModule,
  ],
})
export class ArticleModule { }
