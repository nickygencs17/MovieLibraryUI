import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { User } from '../user';
import { Customer } from '../customer';
import { DataService } from '../service/dataservice';
import { Location } from '../location';

const styles = require('./addcustomer.css');
const template = require('./addcustomer.html');

@Component({
  selector: 'addcustomer',
  template: template,
  styles: [styles]
})
export class AddCustomer {
  public location: Location;
  public customer: Customer;
  public account: any;
  public customerID;
  public object: any;
  public validForm = true;
  constructor(public router: Router, public http: Http, public dataservice: DataService) { }
  employeeCustomerServices(event) {
    this.router.navigate(['employeecustomerservices']);
  }


addCustomer($event, firstname, lastname,
  address, city, state, creditcardnumber,
  zipcode, password, ssn, telephone, email, rating, dateOpened, type) {
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

    this.account = {
      dateopened: dateOpened,
      id: parseInt(ssn),
      type: type
    };

    console.log(this.object);
    this.postCustomer();
  }

  postCustomer() {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.object;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/employee/customer',
        body, { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              this.customerID = data.entity;
              console.log(this.customerID);
              this.postAccount();
            },
            error => {
              console.log(error.text());
              alert(`{
                  "datetime": "date",
                  "id": 0,
                  "returndate": "date"
            }`);
            }
        );
  }

  private postAccount() {
    console.log(this.account);
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.account;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/employee/account',
        body, {headers: authHeader})
        .map((data) => data.json())
        .subscribe((data) => {
              this.customerID = data.entity;
              console.log(this.customerID);
              alert('created');
            },
            error => {
              console.log(error.text());
              alert(`{
                  "customer": {
                    "creditcardnumber": "string",
                    "customer": {
                      "address": "string",
                      "firstname": "string",
                      "lastname": "string",
                      "location": {
                        "city": "string",
                        "state": "string",
                        "zipcode": 0
                      },
                      "password": "string",
                      "ssn": 0,
                      "telephone": "string"
                    },
                    "email": "string",
                    "id": 0,
                    "rating": 0
                  },
                  "dateopened": "2017-05-02T21:25:16.640Z",
                `);
            }
        );
  }
}

