import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { User } from '../user';
import { Customer } from '../customer';
import { DataService } from '../service/dataservice';
import { Location } from '../location';

const styles = require('./addactor.css');
const template = require('./addactor.html');

@Component({
  selector: 'addactor',
  template: template,
  styles: [styles]
})
export class AddActor {
  public location: Location;
  public customer: Customer;
  public object: any;
  public validForm = true;
  constructor(public router: Router, public http: Http, public dataservice: DataService) { }
  employeeCustomerServices(event) {
    this.router.navigate(['adminmovieservices']);
  }


  addActor($event, name, age, sex, rating, csvOfMovieIds ) {
    this.object = {
      name: name,
      age: parseInt(age),
      sex: sex,
      rating: parseInt(rating)
    };

    console.log(this.object);
    this.postActor(csvOfMovieIds);
  }

  postActor(csvOfMovieIds) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.object;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/manager/actor?movieIDCSV=' + csvOfMovieIds,
      body, { headers: authHeader })
      .subscribe(
      response => {
        console.log(response.json());
        alert('Created');
      },
      error => {
        console.log(error.text());
        alert(`Please Make sure your id is valid
        {
                   {
  "age": 0,
  "id": 0,
  "name": "string",
  "rating": 0,
  "sex": "char"
}`);
      }
      );
  }
}

