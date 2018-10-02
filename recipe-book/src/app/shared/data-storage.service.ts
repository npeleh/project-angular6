import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import 'rxjs/Rx';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {Observable} from 'rxjs';
import {ModalService} from '../modal/modal.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private modalService: ModalService,
              private authService: AuthService) {
  }

  storeRecipes() {
    // const headers = new HttpHeaders().set('Authorization', 'xfvdfvdvf')

    // return this.httpClient.put('https://ng-recipe-book-5aca7.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   // headers: headers
    // });

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-5aca7.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
      reportProgress: true
    });
    return this.httpClient.request(req);
  }

  getRecipes() {
    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-5aca7.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://ng-recipe-book-5aca7.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          console.log(recipes);
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
            this.modalService.error = 'Error 404!';
          } else {
            this.modalService.error = 'Error!';
          }
          this.modalService.show = false;
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
