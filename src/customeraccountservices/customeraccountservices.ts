import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./customeraccountservices.css');
const template = require('./customeraccountservices.html');

@Component({
  selector: 'customeraccountservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class CustomerAccountServices {
  public path = 'http://localhost:8080/storage/customer/';
  public movieArray: any;
  public customerById;
  public edited = true;
  public orderArray: any;

  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }

  logout(event) {
    this.router.navigate(['login']);
  }

  customerHome(event) {
    this.router.navigate(['customerhome']);
  }

  curentMoviesByCustomerId(event, customerid) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    authHeader.append('Accept', 'application/json');
    event.preventDefault();
    this.http.get(this.path + 'currentlyHeldMovies/' + customerid, {headers: authHeader})
        .map((data) => data.json())
        .subscribe((data) => {
              this.movieArray = data.entity;
                if (data.statusType === 'CONFLICT') {
                    alert('You do not have access to this customers info');
                }
            },
            error => {
              if (error.status === 404) {
                alert('Name Not Found');
              } else if (error.status === 401) {
                alert('Please Enter a Valid CustomerId');
              } else if (error.status === 500) {
                alert('Customer does not exist');
              } else if (error.status === 409) {
                  alert('You do not have access to this customers info');
              } else {
                alert(error.text);
              }
            });
  }

  accountByCustomerId(event, customerid) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    authHeader.append('Accept', 'application/json');
    event.preventDefault();
    this.http.get(this.path + 'account/' + customerid, {headers: authHeader})
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.customerById = data.entity;
                if (data.statusType === 'CONFLICT') {
                    alert('You do not have access to this customers info');
                    this.edited = false;
                } else {
                    if (this.customerById === null) {
                        alert('Customer Not Found');
                        this.edited = true;
                    } else {
                        this.edited = false;
                    }
                }
            },
            error => {
              if (error.status === 404) {
                alert('Name Not Found');
              } else if (error.status === 401) {
                alert('Please Enter a Valid CustomerId');
              } else if (error.status === 500) {
                alert('Customer does not exist');
              } else if (error.status === 409) {
                  alert('You do not have access to this customers info');
              } else {
                alert(error.text);
              }
            });
  }
  ordersByCustomerId($event, customerid) {
  var authHeader = new Headers();
  authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
  authHeader.append('Content-Type', 'a' +
      'pplication/json');
  authHeader.append('Accept', 'application/json');
  event.preventDefault();
  this.http.get(this.path + 'orders/' + customerid + '/current', {headers: authHeader})
      .map((data) => data.json())
      .subscribe((data) => {
            console.log(data);
            this.orderArray = data.entity;
              if (data.entity === null) {
                  alert('You do not have access to this customers info');
              } else if ( data.entity.length === 0) {
                  alert('Nothing in your orders');
              }
          },
          error => {
            if (error.status === 404) {
              alert('CustomerId Not Found');
            } else if (error.status === 401) {
              alert('Please Enter a Valid CustomerId');
            } else if (error.status === 500) {
              alert('Customer does not exist');
            } else {
              alert(error.text);
            }
          });
}
}
