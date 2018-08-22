import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'http://www.trandynow.com/wp-content/uploads/2018/04/recipe.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'http://www.trandynow.com/wp-content/uploads/2018/04/recipe.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
