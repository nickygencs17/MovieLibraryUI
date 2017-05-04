import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./customermovieservices.css');
const template = require('./customermovieservices.html');

@Component({
  selector: 'customermovieservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class CustomerMovieServices {
  public path = 'http://localhost:8080/storage/customer/';
  public movieArray: any;
  public salesReportTotal;
  public edited = true;
  public movieArrayType: any;
  public movieArryMostrented: any;
  public movieArrayKeywords: any;
  public movieArrayActors: any;

  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  customerHome(event) {
    this.router.navigate(['customerhome']);
  }

  queueByCustomerId(event, customerID) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'queue/' + customerID, { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.movieArray = data.entity;
              if ( data.entity.length === 0) {
                  alert('Nothing in your queue');
              }
            },
            error => {
              if (error.status === 404) {
                alert('Customer Id Not Found');
              } else if (error.status === 401) {
                alert('Please Enter a Valid CustomerId');
              } else if (error.status === 500) {
                alert('Customer does not exist');
              }else {
                alert(error.text);
              }
            });
  }
  moviesByType(event, type) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'moviesByType/' + type, { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              this.movieArrayType = data.entity;
                if ( data.entity.length === 0) {
                    alert('No movies by that type found');
                }
            },
            error => {
              if (error.status === 404) {
                alert('Movie Type Not Found');
              } else if (error.status === 400) {
                alert('Please Enter a Valid Movie Id');
              } else {
                alert(error.text);
              }
            });
  }
  moviesMostRented(event) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'bestSellers', { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.movieArryMostrented = data.entity;
            },
            error => {
              if (error.status === 404) {
                alert('Name Not Found');
              } else if (error.status === 400) {
                alert('Please Enter a Valid Name');
              } else {
                alert(error.text);
              }
            });
  }

  moviesByKeywords(event, csvKeywords) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'moviesByKeywords?csvStringOfKeywords='
        + csvKeywords, { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.movieArrayKeywords = data.entity;
                if ( data.entity.length === 0) {
                    alert('No movies found');
                }
            },
            error => {
              if (error.status === 404) {
                alert('Name Not Found');
              } else if (error.status === 400) {
                alert('Please Enter a Valid Name');
              } else {
                alert(error.text);
              }
            });
}
  moviesByActors(event, csvActors) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'moviesByActors?csvStringOfActors='
        + csvActors, { headers: authHeader })
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              this.movieArrayActors = data.entity;
                if ( data.entity.length === 0) {
                    alert('No movies found');
                }
            },
            error => {
              if (error.status === 404) {
                alert('Name Not Found');
              } else if (error.status === 500) {
                alert('No Movies Found');
              } else {
                alert(error.text);
              }
            });
  }

  updateRating(event, movieID, newrating) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
        btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get('http://localhost:8080/storage/customer?rating='
        + newrating + '&movieID=' + movieID, {headers: authHeader})
        .map((data) => data.json())
        .subscribe((data) => {
              console.log(data);
              alert('updated');
            },
            error => {
              if (error.status === 500) {
                alert('Movie Not Found');
              } else if (error.status === 400) {
                alert('Please Enter a Valid Name');
              } else {
                alert(error.text);
              }
            });
  }

}

