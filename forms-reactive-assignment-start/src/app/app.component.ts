import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];
  focus = {
    name: {
      state: true,
      next: 'email'
    },
    email: {
      state: false,
      next: 'status'
    },
    status: {
      state: false,
      next: 'button'
    },
    button: {
      state: false,
      next: null
    }
  };


  ngOnInit() {
    this.projectForm = new FormGroup({
      'name': new FormControl('Angular6', [Validators.required, this.forbiddenName.bind(this)]),
      'email': new FormControl('angular6@gmail.com', Validators.required, this.forbiddenEmail),
      'status': new FormControl('Critical')
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } {
    const regExp = /^[^0-9]+/ig;
    if (!regExp.test(control.value)) {
      return {'nameIsForbidden': true};
    }
    if (control.value.toLowerCase() === 'test') {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+\.[a-z]{2,4}$/igm;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (!regEmail.test(control.value)) {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);

        }
      }, 2000);
    });
    return promise;
  }
}
