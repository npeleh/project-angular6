import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Ingredient} from '../../shared/ingredient.model';
import {AuthService} from '../../auth/auth.service';
import {ModalService} from '../../modal.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  deleteRecipe: boolean;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        try {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        } catch (e) {
          this.recipe = new Recipe('', '', '', Ingredient[0]);
          console.log(e);
          this.router.navigate(['../page-not-found']);
        }
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    if (!this.authService.isAuthenticated()) {
      this.modalService.error = 'Sign up please';
      this.modalService.show = false;
      this.modalService.open('custom-modal-1');
    }
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.modalService.show = true;
    this.modalService.error = 'A you sure?';
    this.modalService.open('custom-modal-1');
    this.modalService.deleteObserver
      .subscribe(
        (del: boolean) => {
          if (del) {
            this.recipeService.deleteRecipe(this.id);
            this.router.navigate(['/recipes']);
            this.modalService.close('custom-modal-1');
          } else {
            this.modalService.close('custom-modal-1');
          }
        }
      );
  }

}
