import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./admincustomerservices.css');
const template = require('./admincustomerservices.html');

@Component({
  selector: 'admincustomerservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class AdminCustomerServices {
  public customerArray: any;
  public path = 'http://localhost:8080/storage/manager/';
  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  adminHome(event) {
    this.router.navigate(['adminhome']);
  }
  getMostActiveCustomers(event) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'mostTransactions', { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        this.customerArray = data.entity;
      },
      error => {
        if (error.status === 401) {
          alert('Please Log In');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }
      });
  }
}

