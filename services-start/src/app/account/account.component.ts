import {Component, Input} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;
  // @Output() statusChanged = new EventEmitter<{ id: number, newStatus: string }>();

  constructor(private logginService: LoggingService,
              private accountsService: AccountsService) {

  }

  onSetTo(status: string) {
    this.accountsService.updateStatus(this.id, status);
    // this.statusChanged.emit({id: this.id, newStatus: status});

    this.accountsService.statusUpdate.emit(status);


    // this.logginService.logStatusChange(status);
  }
}
