import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Movie } from '../movie';
import { DataService } from '../service/dataservice';
import { Customer } from '../customer';
import { Location } from '../location';

const styles = require('./editcustomer.css');
const template = require('./editcustomer.html');

@Component({
  selector: 'editcustomer',
  template: template,
  styles: [styles]
})
export class EditCustomer {
  public location: Location;
  public object: any;
  public validForm = true;
  public customerById: any;
  public edited = true;
  public customer: Customer;
  constructor(public router: Router, public http: Http, public dataservice: DataService) { }
  employeeCustomerServices(event) {
    this.router.navigate(['employeecustomerservices']);
  }




  getCustomerbyID($event, customerID) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get('http://localhost:8080/storage/employee/'
      + customerID, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.customerById = data.entity;
            if ( this.customerById === null ) {
              alert('Employee Not Found');
              this.edited = true;
            } else {
              this.edited = false;
            }
      },
      error => {
        if (error.status === 404) {
          alert('Employee Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Name');
        } else if (error.status === 500) {
          alert('Please Enter a Valid Customer Id');
        } else {
          alert(error.text);
        }
      });

  }




  editCustomer($event, firstname, lastname,
    address, city, state, creditcardnumber,
    zipcode, password, ssn, telephone, email, rating, type) {
    this.location = {
      state: state,
      city: city,
      zipcode: parseInt(zipcode)
    };
    this.customer = {
      address: address,
      firstname: firstname,
      lastname: lastname,
      location: this.location,
      password: password,
      ssn: parseInt(ssn),
      telephone: parseInt(telephone)
    };
    this.object = {
      customer: this.customer,
      email: email,
      id: parseInt(ssn),
      creditcardnumber: creditcardnumber,
      rating: rating
    };

    console.log(this.object);
    this.putMethod(type);
  }

  putMethod(type) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.object;
    event.preventDefault();
    this.http.put('http://localhost:8080/storage/employee/editCustomer/' + type,
      body, { headers: authHeader })
      .subscribe(
      response => {
        console.log(response.json());
        alert('Created');
      },
      error => {
        if (error.status === 404) {
          alert('Employee Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Name');
        } else if (error.status === 500) {
          alert('Please Enter a Valid Customer Id');
        } else {
          alert(error.text);
        }
      });
  }
}
