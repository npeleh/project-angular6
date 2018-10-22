import {CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class RecipeGuardService implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: RecipeEditComponent): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
