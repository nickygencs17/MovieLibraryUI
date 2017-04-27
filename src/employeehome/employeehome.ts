import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService} from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit, OnDestroy} from '@angular/core';
import { contentHeaders } from '../common/headers';
import { Http, Response, Headers } from '@angular/http';

const styles = require('./employeehome.css');
const template = require('./employeehome.html');

@Component({
  selector: 'employeehome',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class EmployeeHome  {
  constructor(public router: Router) {
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
  employeeHelpServices(event) {
    this.router.navigate(['employeehelpservices']);
  }
}
