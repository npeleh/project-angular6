export class CounterService {
  countInactive = 0;
  countActive = 0;

  counterActive(){
    this.countActive = this.countActive + 1;
    console.log('Press Count Active = ' + this.countActive);
  }

  counterInactive(){
    this.countInactive = this.countInactive + 1;
    console.log('Press Count Inactive = ' + this.countInactive);
  }
}
