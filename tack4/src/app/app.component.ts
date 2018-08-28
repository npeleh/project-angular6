import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  num = 0;
  arr;
  getNum(num: number){
    this.num = num;
  }
  getArr(arr: number[]){
    this.arr = arr;
  }
}
