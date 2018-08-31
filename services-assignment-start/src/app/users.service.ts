import {CounterService} from './counter.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {
  }

  addInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.counterActive();
  }

  addActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.counterInactive();
  }


}
