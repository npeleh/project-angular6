import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FocusElementDirective} from '../shared/focus-element.directive';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
    FocusElementDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ShoppingListModule {

}
