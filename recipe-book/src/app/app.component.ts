import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor() {}

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCGo1im6H4WK_Rq8baKTQ53Bc9NGawi2QE',
      authDomain: 'ng-recipe-book-5aca7.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
