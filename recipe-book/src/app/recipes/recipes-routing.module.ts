import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from '../auth/auth-guard.service';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesStartComponent} from './recipes-start/recipes-start.component';
import {RecipesComponent} from './recipes.component';
import {RecipeGuardService} from './recipe-guard.service';


const recipesRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {path: '', component: RecipesStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard], canDeactivate: [RecipeGuardService]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard, RecipeGuardService]
})
export class RecipesRoutingModule {

}
