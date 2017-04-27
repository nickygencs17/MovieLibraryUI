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
  constructor(public router: Router) {
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
}
