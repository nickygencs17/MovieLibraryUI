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
export class CustomerHome {
  public path = 'http://localhost:8080/storage/customer/';
  public movieArray: any;
  public customerById;
  public edited = true;

  constructor(public router: Router, public http: Http, public dataservice: DataService) {
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


  moviesByCustomerId(event, customerid) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    authHeader.append('Accept', 'application/json');
    event.preventDefault();
    this.http.get(this.path + 'suggestionMovies/' + customerid, { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.movieArray = data.entity;
              if (data.entity === null) {
                alert('You do not have access to this customers info');
              } else if (data.entity.length === 0) {
                alert('No Suggestions for you yet!');
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


}
