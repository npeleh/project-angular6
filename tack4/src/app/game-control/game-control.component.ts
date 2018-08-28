import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() selectNum = new EventEmitter<number>();
  @Output() selectArr = new EventEmitter<number[]>();
  num = 0;
  arr = [];
  ref;

  constructor() {
  }

  ngOnInit() {
  }

  start(num: number) {
    this.ref = setInterval(() => {
      num++;
      this.arr.push(num);
      this.selectArr.emit(this.arr);
      this.selectNum.emit(num);
    }, 1000);
  }

  stop(num) {
    this.arr = [];
    num = 0;
    this.selectNum.emit(num);
    clearInterval(this.ref);
  }

}
