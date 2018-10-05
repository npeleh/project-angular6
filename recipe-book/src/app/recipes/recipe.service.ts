import {Subject} from 'rxjs/Subject';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://gracefoods.com/images/Recipes2017/cropped-Pepperpot.jpg',
      [
        new Ingredient('Banana', 5),
        new Ingredient('Meat', 1)
      ]
    ),
    new Recipe(
      'Another Test Recipe',
      'This is another simply a test',
      'https://search.chow.com/thumbnail/800/600/www.chowstatic.com/assets/recipe_photos/31153_RecipeImage_pulled_pork_enchaladas_.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('French', 3)
      ]
    )
  ];

  constructor() {}

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    if (isNaN(index) || index > this.recipes.length) {
      throw new Error('There is no such number');
    } else {
      return this.recipes[index];
    }
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
