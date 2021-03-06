import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService } from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
const styles = require('./adminmovieservices.css');
const template = require('./adminmovieservices.html');

@Component({
  selector: 'adminmovieservices',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class AdminMovieServices {
  public path = 'http://localhost:8080/storage/manager/';
  public movieArray: any;
  public movieArrayType: any;
  public movieArryByCustomerName: any;
  public movieArryMostrented: any;
  public movieByName;
  public edited = true;

  constructor(public router: Router, public http: Http, public dataservice: DataService) {
  }
  logout(event) {
    this.router.navigate(['login']);
  }
  adminHome(event) {
    this.router.navigate(['adminhome']);
  }
  addMovie(event) {
    this.router.navigate(['addmovie']);
  }
  editMovie(event) {
    this.router.navigate(['editmovie']);
  }
  addActor(event) {
    this.router.navigate(['addactor']);
  }
  deleteMovie(event, movieid) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.delete(this.path + 'movie/' + movieid, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        alert(movieid + ' has been deleted.');
      },
      error => {
        if (error.status === 404) {
          alert('Movie Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }

      });
  }
  getAllMovies(event) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'movies', { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        this.movieArray = data.entity;
      },
      error => {
        if (error.status === 404) {
          alert('Movie Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }
      });
  }
  moviesByType(event, type) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'movies/type/' + type, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        this.movieArrayType = data.entity;
        console.log(this.movieArrayType);
        if (this.movieArrayType.length === 0) {
          alert('No movies of that type found');
        }
      },
      error => {
        if (error.status === 500) {
          alert('Movie Type Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }
      });
  }
  moviesByName(event, type) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'movies/name/' + type, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.movieByName = data.entity;
        if (this.movieByName != null) {
          this.edited = false;
        } else {
          alert('Movie Not Found');
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
  moviesByCustomerName(event, firstname, lastname) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'movies/customer?firstname='
    + firstname + '&lastname=' + lastname, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.movieArryByCustomerName = data.entity;
      },
      error => {
        if (error.status === 404) {
          alert('Name Not Found');
        } else if (error.status === 500) {
          alert('Please Enter a Valid Name');
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
    this.http.get(this.path + 'mostRented', { headers: authHeader })
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
}
