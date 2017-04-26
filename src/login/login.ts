import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Rx';
import {MyService} from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnDestroy } from '@angular/core';

const styles = require('./login.css');
const template = require('./login.html');

@Component({
  selector: 'login',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class Login implements OnDestroy {
  public loginData;
  public postObject: any;
  public rank = ' ';
  public un;
  public pass;

  constructor(public router: Router, public http: Http, private gd: MyService,
  public dataservice: DataService) {
  }
  login(event, username, password) {
    this.un = username;
    this.pass = password;
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(username + ':' + password));
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    this.http.get('http://localhost:8080/login', { headers: authHeader})
      .map((data) => data.json())
        .subscribe((data) => {
          this.postObject = data;
          this.rank = this.postObject.entity.roles[0];
          if (this.rank === 'ROLE_ADMIN') {
            this.router.navigate(['adminhome']);
          } else if ( this.rank === 'ROLE_CUSTOMER') {
            this.router.navigate(['customerhome']);
          } else {
            this.router.navigate(['userhome']);
          }
        },
      error => {
        console.log(error.text());
        alert('Username/Password Bad or No Available Subscriptions: Please Contact Admin');
      });
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
   ngOnDestroy() {
     this.dataservice.username = this.un;
     this.dataservice.password = this.pass;
  }
}
