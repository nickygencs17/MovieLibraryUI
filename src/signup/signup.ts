import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { User } from '../user';
import { NewUser } from '../newUser';

const styles = require('./signup.css');
const template = require('./signup.html');

@Component({
  selector: 'signup',
  template: template,
  styles: [styles]
})
export class Signup implements OnInit {
  public user: User;
  public emailPost = '';
  public usernamePost = '';
  public passwordPost = '';
  public newUser: NewUser;
  public rank = 1 ;
  constructor(public router: Router, public http: Http) { }

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }


  signup(event, username, email, password) {
    this.emailPost = email;
    this.usernamePost = username;
    this.passwordPost = password;
     this.buildNewUser();
    event.preventDefault();
    let body = JSON.stringify(this.newUser);
    console.log(body);
    this.http.post('http://10.129.12.61:8080/create_user', body, { headers: contentHeaders })
      .subscribe(
      response => {
        console.log(response.json());
        alert('User Created Please Login');
        this.router.navigate(['login']);
      },
      error => {
        alert(error.text());
        console.log(error.text());
        alert('error');
      }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

  save(model: User, isValid: boolean) {
    this.user = model;
    this.emailPost = model.email;
    this.usernamePost = model.username;
    this.passwordPost = model.password;
    this.buildNewUser();

  }
  buildNewUser() {
    this.newUser = {
      username: this.usernamePost,
      email: this.emailPost,
      password: this.passwordPost
    };
  }
}
