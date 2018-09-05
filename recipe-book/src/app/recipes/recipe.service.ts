import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
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

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
