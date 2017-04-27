import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./adminhome.css');
const template = require('./adminhome.html');

@Component({
  selector: 'adminhome',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class AdminHome {
  public path = 'http://localhost:8080/storage/manager/';
  public salesReportTotal;
   public edited = true;
  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  adminMovieServices(event) {
    this.router.navigate(['adminmovieservices']);
  }
   adminEmployeeServices(event) {
    this.router.navigate(['adminemployeeservices']);
  }
  adminCustomerServices(event) {
    this.router.navigate(['admincustomerservices']);
  }
  adminHelpServices(event) {
    this.router.navigate(['adminhelpservices']);
  }
  getSalesReport(event, month) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'sales/' + month, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.salesReportTotal = data.entity.toString();
      },
      error => {
        if (error.status === 404) {
          alert('Movie Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Interger');
        } else if (error.status === 401) {
          alert('Please Enter a Valid Interger');
        } else if (error.status === 500) {
          alert('Please Enter a Valid Interger');
        } else {
          alert('Uknown Error Check Log');
        }
      });
    this.edited = false;
  }
}
