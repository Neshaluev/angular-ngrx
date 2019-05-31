import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryResolver } from './shared/classes/category.resolver';
import { ItemListComponent } from './item-list/item-list.component';

const routes: Routes = [
  {path: '', component: CategoryListComponent},
  {path: ':id', component: ItemListComponent, resolve: CategoryResolver}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
