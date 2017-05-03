import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService} from '../service/myservice';
import { UserName } from '../username';
import { OnInit, OnDestroy} from '@angular/core';
import { contentHeaders } from '../common/headers';
import { Http, Response, Headers } from '@angular/http';
import { DataService } from '../service/dataservice';

const styles = require('./employeehome.css');
const template = require('./employeehome.html');

@Component({
  selector: 'employeehome',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class EmployeeHome  {
  public customerMailingList: any;
  public employeeArray: any;
  public path = 'http://localhost:8080/storage/employee/';
  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  employeeOrderServices(event) {
    this.router.navigate(['employeeorderservices']);
  }
  employeeCustromerServices(event) {
    this.router.navigate(['employeecustomerservices']);
  }

    getMailingList(event) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'mailList', { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        this.customerMailingList = data.entity;
      },
      error => {
        if (error.status === 404) {
          alert('Customer Not Found');
        } else {
          alert(error.text);
        }
      });
  }
  getAllEmployees(event) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + '/all', { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.employeeArray = data;
              console.log(this.employeeArray);
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
  }
}
