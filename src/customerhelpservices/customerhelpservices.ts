import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./customerhelpservices.css');
const template = require('./customerhelpservices.html');

@Component({
  selector: 'customerhelpservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class CustomerHelpServices {
  constructor(public router: Router) {
  }
   logout(event) {
    this.router.navigate(['login']);
  }
  customerHome(event) {
    this.router.navigate(['customerhome']);
  }
}
