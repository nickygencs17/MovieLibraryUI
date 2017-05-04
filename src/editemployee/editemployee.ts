import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Movie } from '../movie';
import { DataService } from '../service/dataservice';
import { Employee } from '../employee';
import { Location } from '../location';

const styles = require('./editemployee.css');
const template = require('./editemployee.html');

@Component({
  selector: 'editmovie',
  template: template,
  styles: [styles]
})
export class EditEmployee {
  public location: Location;
  public employee: Employee;
  public object: any;
  public validForm = true;
  public employeeById: any;
  public edited = true;
  constructor(public router: Router, public http: Http, public dataservice: DataService) { }
    adminEmployeeServices(event) {
    this.router.navigate(['adminemployeeservices']);
  }




  getEmployeebyID($event, employeeID) {
      this.edited = true;
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get('http://localhost:8080/storage/manager/'
     + employeeID, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.employeeById = data.entity;
              if ( this.employeeById === null ) {
                  alert('Employee Not Found');
                  this.edited = true;
              } else {
                  this.edited = false;
              }
      },
      error => {
        if (error.status === 404) {
          alert('Movie Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Name');
        } else if (error.status === 500) {
          alert('Please Enter a Valid Name');
        } else {
          alert(error.text);
        }
      });
  }




   putEmployee(event, firstname, lastname, address, city, state, zipcode,
    password, ssn, telephone, hourlyrate, startdate) {
    this.location = {
      state: state,
      city: city,
      zipcode: parseInt(zipcode)
    };
    this.employee = {
      address: address,
      firstname: firstname,
      lastname: lastname,
      location: this.location,
      password: password,
      ssn: parseInt(ssn),
      telephone: parseInt(telephone)
    };
    this.object = {
      employee: this.employee,
      hourlyrate: parseInt(hourlyrate),
      id: parseInt(ssn),
      startdate: startdate
    };

    console.log(this.object);
    this.putMethod();
  }

  putMethod() {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.object;
    event.preventDefault();
    this.http.put('http://localhost:8080/storage/manager/editEmployee',
      body, { headers: authHeader })
      .subscribe(
      response => {
        console.log(response.json());
        alert('Edited');
      },
          error => {
              if (error.status === 404) {
                  alert('Employee Name Not Found');
              } else if (error.status === 400) {
                  alert('Please Enter a Valid Name');
              } else if (error.status === 500) {
                  alert('Please Enter a Valid Employee Id');
              } else {
                  alert(error.text);
              }
          });
  }

}
