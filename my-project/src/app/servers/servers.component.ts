import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  servername = 'Testserver';
  serverCreationStatus = 'No server was created!';

  username = '';
  button = true;

  constructor() {
    // setTimeout(() => {
    //   this.allowNewServer = true;
    // },2000);
  }

  ngOnInit() {
  }

  onCreationServer(){
    this.serverCreationStatus = 'Server was created! Name is' + this.servername;
  }

  resetB(){
    this.button = true;
    this.username = '';
  }
  onUpdateName(event: Event){
    if((<HTMLInputElement>event.target).value){
      this.button = false;
    }
  }
}
