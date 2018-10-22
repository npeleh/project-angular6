import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromRecipe from '../store/recipe.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import {take} from 'rxjs/operators';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  authState: Observable<fromAuth.State>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private store: Store<fromRecipe.FetureState>) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    this.authState = this.store.select('auth');
  }

  onNewRecipe() {
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
    // if (!this.authService.isAuthenticated()) {
    //   this.modalService.error = 'Sign up please';
    //   this.modalService.show = false;
    //   this.modalService.open('custom-modal-1');
    // }
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
