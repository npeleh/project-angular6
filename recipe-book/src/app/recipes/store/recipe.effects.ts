import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {switchMap, withLatestFrom, map} from 'rxjs/operators';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as RecipeActions from '../store/recipe.action';
import {Recipe} from '../recipe.model';
import {ModalService} from '../../modal/modal.service';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.action$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
      switchMap(
        (action: RecipeActions.FetchRecipes) => {
          return this.httpClient.get<Recipe[]>('https://ng-recipe-book-5aca7.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json'
          });
        }),
      map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return {
            type: RecipeActions.SET_RECIPE,
            payload: recipes
          };
        }
        // error handling
      ));
  // .catch(
  //   (error: Response) => {
  //     if (error.status === 404) {
  //       this.modalService.error = 'Error 404!';
  //     } else {
  //       this.modalService.error = 'Error!';
  //     }
  //     this.modalService.show = false;
  //     // add component
  //     this.modalService.open('custom-modal-1');
  //     return Observable.throw('error massage');
  //   }
  // )


  @Effect({dispatch: false})
  recipeStore = this.action$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(
      ([action, state]) => {
        console.log(action);
        console.log(state.recipes);
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-5aca7.firebaseio.com/recipes.json', state.recipes, {
          reportProgress: true
        });
        return this.httpClient.request(req);
      }
    ));

  constructor(private action$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FetureState>,
              private modalService: ModalService) {
  }
}
