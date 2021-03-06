import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { User } from '../user';
import { Movie } from '../movie';
import { DataService } from '../service/dataservice';

const styles = require('./addmovie.css');
const template = require('./addmovie.html');

@Component({
  selector: 'addmovie',
  template: template,
  styles: [styles]
})
export class AddMovie {
  public movie: Movie;
  public validForm = true;
  constructor(public router: Router, public http: Http, public dataservice: DataService) { }
  adminMovieServices(event) {
    this.router.navigate(['adminmovieservices']);
  }


  addMovie($event, name, distributionfee, type, numcopies, rating, csvOfActorIds) {
    this.movie = {
      id: 0,
      name: name,
      numcopies: parseInt(numcopies),
      rating: parseInt(rating),
      type: type,
      distrfee: parseInt(distributionfee)
    };
    this.postMethod(csvOfActorIds);
  }

  postMethod(csvOfActorIds) {
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
    authHeader.append('Content-Type', 'application/json');
    let body = this.movie;
    event.preventDefault();
    this.http.post('http://localhost:8080/storage/manager/movie?csvOfActorIds=' + csvOfActorIds,
      body, { headers: authHeader })
      .subscribe(
      response => {
        console.log(response.json());
        alert('Created');
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

