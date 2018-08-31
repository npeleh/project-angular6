import {Component} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{ name: string, status: string }>();

  constructor(private logginService: LoggingService,
              private accountsService: AccountsService) {
    this.accountsService.statusUpdate.subscribe(
      (status: string) => alert('New Status: ' + status);
  )
  }

  onCreateAccount(accountName: string, accountStatus: string) {

    this.accountsService.addAccount(accountName, accountStatus);
    // this.accountAdded.emit({
    //   name: accountName,
    //   status: accountStatus
    // });


    // this.logginService.logStatusChange(accountStatus);


    // const service = new LoggingService();
    // service.logStatusChange(accountStatus);


    // console.log('A server status changed, new status: ' + accountStatus);
  }
}
