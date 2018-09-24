import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()
export class ServerService {

  constructor(private http: Http) {
  }

  storeServers(servers: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    // return this.http.post('https://ng-http-30efe.firebaseio.com/data.json',
    //   servers,
    //   {headers: headers});
    return this.http.put('https://ng-http-30efe.firebaseio.com/data.json',
      servers,
      {headers: headers});
  }

  getServers() {
    return this.http.get('https://ng-http-30efe.firebaseio.com/data')
      .map(
        (response: Response) => {
          const data = response.json();
          // console.log(typeof data); // how to know we receive Observable??
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('Something went wrong');
        }
      );
  }

  getAppName() {
    return this.http.get('https://ng-http-30efe.firebaseio.com/data/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
}
