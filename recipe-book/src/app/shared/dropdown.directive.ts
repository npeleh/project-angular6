import {Directive, HostBinding, HostListener} from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

import {Store} from '@ngrx/store';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private store: Store<fromApp.AppState>) {}

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
