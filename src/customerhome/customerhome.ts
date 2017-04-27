import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService} from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./customerhome.css');
const template = require('./customerhome.html');

@Component({
  selector: 'customerhome',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class CustomerHome  {
  constructor(public router: Router) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  customerMovieServices(event) {
    this.router.navigate(['customermovieservices']);
  }
  customerAccountServices(event) {
    this.router.navigate(['customeraccountservices']);
  }
  customerHelpServices(event) {
    this.router.navigate(['customerhelpservices']);
  }
}
