import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,MatSlideToggleModule,MatSortModule} from "@angular/material";
import { MatMenuModule } from '@angular/material/menu';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryComponent } from './category.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ItemListComponent } from './item-list/item-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromCategory from './shared/redux/reducer/category.reducer';
import * as fromPositions from './shared/redux/reducer/positions.reducer';
import * as fromOrder from './shared/redux/reducer/order.reducer';
import { CategoryEffect } from './shared/redux/effect/category.effect';
import { CategoryResolver } from './shared/classes/category.resolver';



@NgModule({
  declarations: [CategoryListComponent, CategoryCardComponent, CategoryComponent, CategoryDialogComponent, ItemListComponent],
  entryComponents: [CategoryDialogComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatMenuModule,
    StoreModule.forFeature('categories', fromCategory.reducer),
    StoreModule.forFeature('positions', fromPositions.reducer),
    StoreModule.forFeature('order', fromOrder.reducer),
    EffectsModule.forFeature([CategoryEffect])
  ],
  providers: [
    CategoryResolver
  ]

})
export class CategoryModule { }
