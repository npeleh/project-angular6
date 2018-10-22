import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {take, map} from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.action';
import * as fromRecipe from '../store/recipe.reducers';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  subscription: Subscription;

  saved = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modalService: ModalService,
              private store: Store<fromRecipe.FetureState>
  ) {

  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.recipeForm.dirty && this.recipeForm.touched) {
      this.modalService.show = true;
      this.modalService.error = 'Do you want save changes?';
      this.modalService.open('custom-modal-1');
      return this.modalService.deleteObserver
        .pipe(
          map((del: string) => {
            if (del === 'yes') {
              this.modalService.close('custom-modal-1');
              this.store.dispatch(new RecipeActions.UpdateRecipe({
                index: this.id,
                updatedRecipe: this.recipeForm.value
              }));
              return true;
            } else if (del === 'close') {
              this.modalService.close('custom-modal-1');
              return false;
            } else if (del === 'no') {
              this.modalService.close('custom-modal-1');
              return true;
            }
          })
        );
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);


    if (this.editMode) {
      this.store.select('recipes')
        .pipe(take(1))
        .subscribe(
          (recipeState: fromRecipe.State) => {
            const recipe = recipeState.recipes[this.id];
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
              for (let ingredient of recipe.ingredients) {
                recipeIngredients.push(
                  new FormGroup({
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [
                      Validators.required,
                      Validators.pattern(/^[1-9]+[0-9]*$/)
                    ])
                  })
                );
              }
            }
          }
        );
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, [
        Validators.required,
        Validators.pattern(/^https\:\/\/[a-zA-Z0-9\./\-\_\s]+\.[a-z]{2,4}$/)
      ]),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
