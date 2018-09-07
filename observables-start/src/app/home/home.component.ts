import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription, interval} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const myNumber = interval(2000)
      .pipe(
        map(
          (data: number) => {
            console.log('Data: ', data);
            return data++;
          }
        )
      );
    this.numbersObsSubscription = myNumber.subscribe(
      (number: number) => {
        console.log(number);
      }
    );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package');
        }, 2000);
        setTimeout(() => {
          observer.next('second package');
        }, 4000);
        setTimeout(() => {
          observer.complete();
          // observer.next('this does not work');
        }, 5000);
        setTimeout(() => {
          observer.next('third package');
        }, 6000);
      }
    );

    this.customObsSubscription = myObservable.subscribe(
      (data: string) => {
        console.log(data);
      },
      (error: string) => {
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }

  ngOnDestroy() {
    this.numbersObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }
}
