import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./employeecustomerservices.css');
const template = require('./employeecustomerservices.html');

@Component({
  selector: 'employeecustomerservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class EmployeeCustomerServices {
  public path = 'http://localhost:8080/storage/employee/';
  public employeeMost;
  public edited = true;
  public movieArray: any;

  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }

  logout(event) {
    this.router.navigate(['login']);
  }

  employeeHome(event) {
    this.router.navigate(['employeehome']);
  }

  addCustomer(event) {
    this.router.navigate(['addcustomer']);
  }

  editCustomer(event) {
    this.router.navigate(['editcustomer']);
  }

  deleteCustomer(event, customerid) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.delete(this.path + customerid, {headers: authHeader})
        .map((data) => data.json())
        .subscribe((data) => {
              alert(customerid + ' has been deleted.');
            },
            error => {
              if (error.status === 404) {
                alert('Movie Not Found');
              } else if (error.status === 400) {
                alert('Please Enter a Valid Customer Id');
              } else {
                alert(error.text);
              }

            });
  }
  moviesByCustomerId(event, customerid) {
       var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'recommendation/' + customerid, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.movieArray = data.entity;
      },
      error => {
        if (error.status === 404) {
          alert('Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid MovieId');
        } else {
          alert(error.text);
        }
      });
  }

}
