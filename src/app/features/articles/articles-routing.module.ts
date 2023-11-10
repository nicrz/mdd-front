import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/list/list.component';
import { ArticleDetailComponent } from './components/detail/detail.component';
import { ArticleFormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: '', component: ArticlesListComponent },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'create', title: 'Nouvel article', component: ArticleFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {}
