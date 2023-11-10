import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from './components/me/me.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListComponent } from './features/themes/components/list/list.component';
import { ArticlesListComponent } from './features/articles/components/list/list.component';
import { ArticleDetailComponent } from './features/articles/components/detail/detail.component';
import { ArticleFormComponent } from './features/articles/components/form/form.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'me',
    canActivate: [AuthGuard], 
    component: MeComponent
  },
  {
    path: 'themes',
    canActivate: [AuthGuard], 
    component: ListComponent
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ArticlesListComponent },
      { path: 'detail/:id', component: ArticleDetailComponent },
      { path: 'create', component: ArticleFormComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
