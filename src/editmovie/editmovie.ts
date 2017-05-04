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
   public edited = true;
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
    this.http.get(this.path + 'movie/' + movieID, { headers: authHeader })
      .map((data) => data.json())
      .subscribe((data) => {
        console.log(data);
        this.movieByID = data.entity;
        if ( this.movieByID != null ) {
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
  putMovie(event, id, name, distrfee, type, numcopies, rating) {

    this.movie = {
      distrfee: parseInt(distrfee),
      id: parseInt(id),
      name: name,
      numcopies: parseInt(numcopies),
      rating: parseInt(rating),
      type: type
    };
    this.putMethod();
  }

  putMethod() {

    console.log(this.movie);
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.movie;
    event.preventDefault();
    this.http.put('http://localhost:8080/storage/manager/editMovies',
      body, { headers: authHeader })
      .subscribe(
      response => {
        console.log(response.json());
        alert('Edited');
      },
      error => {
        if (error.status === 404) {
          alert('Movie Name Not Found');
        } else if (error.status === 400) {
          alert('Please Enter a Valid Name');
        } else if (error.status === 500) {
          alert('Please Enter a Valid Movie Id');
        } else {
          alert(error.text);
        }
      });

}}

