import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') formControl: NgForm;

  email = 'nastysia13@gmail.com';
  subscriptions = 'advanced';
  password = '1111';
  data = false;

  onSubmit() {
    this.data = true;
    this.email = this.formControl.value.email;
    this.subscriptions = this.formControl.value.subscriptions;
    this.password = this.formControl.value.password;

    console.log(
      'Email: ', this.formControl.value.email,
      ', Subscription: ', this.formControl.value.subscriptions,
      ', Password: ', this.formControl.value.password);
    this.formControl.reset();
  }
}

