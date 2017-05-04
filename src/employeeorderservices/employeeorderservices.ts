import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./employeeorderservices.css');
const template = require('./employeeorderservices.html');

@Component({
  selector: 'employeeorderservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
 export class EmployeeOrderServices {



  public order: any;
  public orderID;
  public rentalNode: any;
  public succesful = false;
  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  employeeHome(event) {
    this.router.navigate(['employeehome']);
  }

  addOrder($event, orderdate, customerRep, movieID, accountNumber) {
       this.order = {
         datetime: orderdate,
         id: 0,
         returndate: null
       };
       console.log('here');
       this.postOrder(customerRep, movieID, accountNumber);
  }
  postOrder(customerRep, movieID, customerid) {

    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.order;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/employee/order',
      body, { headers: authHeader })
      .map((data) => data.json())
        .subscribe((data) => {
          this.orderID = data.entity;
           console.log(this.orderID);
      this.rentalNode = {
        customerid: customerid,
        employeeID: customerRep,
        movieID: movieID,
        orderNumber: this.orderID
      };

      console.log(this.rentalNode);

      if ( this.succesful =  true) {
        this.postRental();
      }
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
  postRental() {

    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.rentalNode;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/employee/rental',
      body, { headers: authHeader })
      .map((data) => data.json())
        .subscribe((data) => {
          console.log(data);
          if (data.status === 400) {
              alert('One of your ids is not valid');
          } else {
              alert('Created');
          }
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
}

