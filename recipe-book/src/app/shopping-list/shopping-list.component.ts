import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  selectedItem: number[] = [];

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    if (!this.selectedItem.includes(index)) {
      this.selectedItem.push(index);
    }
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    (<HTMLElement>document.getElementsByClassName('list-group-item')[index]).style.backgroundColor = '#f5f5f5';
  }

}

