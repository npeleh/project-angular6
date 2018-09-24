import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {Observable} from 'rxjs';
import {ModalService} from '../modal.service';

@Injectable()
export class DataStorageService {
  error = '';
  constructor(private http: Http,
              private  recipeService: RecipeService,
              private modalService: ModalService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-5aca7.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-book-5aca7.firebaseio.com/recipes.jso')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }

          return recipes;
        }
        // error handling
      ).catch(
        (error: Response) => {
          if (error.status === 404) {
            this.error = 'Error 404!';
          }
          // add component
          this.modalService.open('custom-modal-1');
          return Observable.throw('error massage');
        }
      )
      // error handling
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        (error) => console.log(error)
      );
  }
}
