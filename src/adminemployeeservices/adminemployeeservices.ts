import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./adminemployeeservices.css');
const template = require('./adminemployeeservices.html');

@Component({
  selector: 'adminemployeeservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class AdminEmployeeServices {
  public path = 'http://localhost:8080/storage/manager/';
  public employeeMost;
  public edited = true;
  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  adminHome(event) {
    this.router.navigate(['adminhome']);
  }
  addEmployee(event) {
  }
  editEmployee(event) {
  }

  deleteEmployee(event, employeeid) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.delete(this.path + '/' + employeeid, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        alert(employeeid + ' has been deleted.');
      },
      error => {
        if (error.status === 404) {
          alert('Movie Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }

      });
  }
  getEmployeeMostTransactions(event) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'employee', { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.employeeMost = data.entity;
      },
      error => {
        if (error.status === 404) {
          alert('Movie Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }
      });
    this.edited = false;
  }
}
