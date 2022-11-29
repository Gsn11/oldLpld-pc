import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroduceModule } from '../pages/introduce/introduce/introduce.module';
import { CheckLogin } from '../pages/common/utils/route/check-logeed.route';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: '../pages/user/login/login.module#LoginModule',
    canActivate: [CheckLogin]
  },
  { path: 'regsiter', loadChildren: '../pages/user/regsiter/regsiter.module#RegsiterModule' },
  { path: 'index', loadChildren: '../pages/main/main.module#MainModule' },
  // { path: 'dashboard', loadChildren: '../pages/dashboard/dashboard.module#DashboardModule' },
  { path: 'recharges', loadChildren: '../pages/recharges/recharges.module#RechargesModule' },
  // 以下都为企业站内容
  // 首页
  { path: '', component: IntroduceModule },
  // 加入我们
  { path: 'partners', loadChildren: '../pages/introduce/joinus/partners/partners.module#PartnersModule' },
  { path: 'maintainer', loadChildren: '../pages/introduce/joinus/maintainer/maintainer.module#MaintainerModule' },
  { path: 'contact', loadChildren: '../pages/introduce/joinus/contact/contact.module#ContactModule' },
  // 关于我们
  { path: 'synopsis', loadChildren: '../pages/introduce/aboutus/archives/synopsis/synopsis.module#SynopsisModule' },
  { path: 'formation', loadChildren: '../pages/introduce/aboutus/archives/formation/formation.module#FormationModule' },
  { path: 'creed', loadChildren: '../pages/introduce/aboutus/culture/creed/creed.module#CreedModule' },
  { path: 'belief', loadChildren: '../pages/introduce/aboutus/culture/belief/belief.module#BeliefModule' },
  { path: 'manage', loadChildren: '../pages/introduce/aboutus/culture/manage/manage.module#ManageModule' },
  { path: 'seniority', loadChildren: '../pages/introduce/aboutus/seniority/seniority/seniority.module#SeniorityModule' },
  { path: 'patent', loadChildren: '../pages/introduce/aboutus/seniority/patent/patent.module#PatentModule' },
  { path: 'copyright', loadChildren: '../pages/introduce/aboutus/statement/copyright/copyright.module#CopyrightModule' },
  { path: 'article', loadChildren: '../pages/introduce/aboutus/statement/article/article.module#ArticleModule' },
  { path: 'privacy', loadChildren: '../pages/introduce/aboutus/statement/privacy/privacy.module#PrivacyModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
