import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {ModalService} from '../../modal/modal.service';
import {Subscription} from 'rxjs';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.action';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  authState: Observable<fromAuth.State>;
  id: number;
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private store: Store<fromRecipe.FetureState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.route.params.subscribe(
      (params: Params) => {
        try {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        } catch (e) {
          // this.recipeState = new Recipe('', '', '', Ingredient[0]);
          console.log(e);
          this.router.navigate(['../page-not-found']);
        }
      }
    );
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .pipe(take(1))
      .subscribe(
        (recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients
            (recipeState.recipes[this.id].ingredients)
          );
        }
      );
  }

  onEditRecipe() {
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDrop() {
    this.authState
      .pipe(take(1))
      .subscribe(
      (authState: fromAuth.State) => {
        if (!authState.authenticated) {
          this.modalService.show = false;
          this.modalService.error = 'Signin, please!';
          this.modalService.open('custom-modal-1');
        }
        return authState.authenticated;
      }
    );
  }

  onDeleteRecipe() {
    this.modalService.show = true;
    this.modalService.error = 'A you sure?';
    this.modalService.open('custom-modal-1');
    this.subscription = this.modalService.deleteObserver
      .subscribe(
        (del: string) => {
          console.log(del);
          if (del === 'yes') {
            this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
            this.router.navigate(['/recipes']);
            this.modalService.close('custom-modal-1');
          } else if (del === 'no') {
            this.modalService.close('custom-modal-1');
          }

          this.subscription.unsubscribe();
        }
      );
  }

}
