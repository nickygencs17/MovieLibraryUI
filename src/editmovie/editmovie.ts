import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Movie } from '../movie';
import { DataService } from '../service/dataservice';

const styles = require('./editmovie.css');
const template = require('./editmovie.html');

@Component({
  selector: 'editmovie',
  template: template,
  styles: [styles]
})
export class EditMovie {
  public movie: Movie;
  public movieByID: Movie;
  public path = 'http://localhost:8080/storage/manager/';
  constructor(public router: Router, public http: Http, public dataservice: DataService) { }

   adminMovieServices(event) {
    this.router.navigate(['adminmovieservices']);
  }
  getMovie($event, movieID) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    this.http.get(this.path + 'movies/name/' + movieID, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.movieByID = data.entity;
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
  putMovie($event, id, name, distrfee, type, numcopies, rating) {
    this.movie = {
      distrfee: distrfee.parseInt,
      id: id.parseInt,
      name: name,
      numcopies: numcopies.parseInt,
      rating: rating.parseInt,
      type: type
    };
    this.postMethod();
  }

  postMethod() {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.movie;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/manager/movie',
      body, { headers: authHeader })
      .subscribe(
      response => {
        console.log(response.json());
      },
      error => {
        console.log(error.text());
        alert(`Movie {
              distrfee: string;
              id: number;
              name: string;
              numcopies: number;
              rating: number;
              type: string;
              } '`);
      }
      );
  }

}
