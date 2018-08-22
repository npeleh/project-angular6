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
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];


  // task2
  username = '';
  button = true;
  // task2

  // task3
  toggleDetails = false;
  count = 0;
  arrDetails = [];
  // task3

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit() {
  }

  onCreationServer(){
    this.serverCreated = true;
    this.servers.push(this.servername);
    this.serverCreationStatus = 'Server was created! Name is' + this.servername;
  }


  // task2
  resetB(){
    this.button = true;
    this.username = '';
  }
  onUpdateName(event: Event){
    if((<HTMLInputElement>event.target).value){
      this.button = false;
    }
  }
  // task2

  // task3
  onButtonDetails(){
    if(this.toggleDetails){
      this.toggleDetails = false;
    }else{
      this.toggleDetails = true;
    }
    this.count = this.count+1;
    this.arrDetails.push(this.count);
  }

  styleDetails(detail){
    return detail > 4 ? 'blue' : 'white';
  }
  // task3

}
