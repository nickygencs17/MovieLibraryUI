import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { MyService} from '../service/myservice';
import { UserName } from '../username';
import { DataService } from '../service/dataservice';
import { OnInit, OnDestroy} from '@angular/core';
import { contentHeaders } from '../common/headers';
import { Http, Response, Headers } from '@angular/http';

const styles = require('./userhome.css');
const template = require('./userhome.html');

@Component({
  selector: 'userhome',
  template: template,
  styles: [styles],
  providers: [MyService]
})
export class UserHome implements OnInit, OnDestroy {
  hero: UserName;
  public postObject: any;
  public infoObject: any;
  public balance;
  public walletAddress;
  public email;
  public un;
  public pass;
  public pur;
  constructor(public router: Router,
  public http: Http,
  public authHttp: AuthHttp,
  private myService: MyService,
  private dataservice: DataService) {
  }
 ngOnInit() {
    //this.dataservice.UserName; 
    this.makegetRequest();
}
ngOnDestroy(){
  this.logout();
  
}
clicked(event){
  event.preventDefault();
 this.router.navigate(['login']);

   
}
@HostListener('window:beforeunload')
  doSomething() {
    this.logout();
  }

logout(){
  var authHeader = new Headers();
  
  

    authHeader.append('Authorization', 'Basic ' +
      btoa(this.dataservice.username + ':' + this.dataservice.password));
       authHeader.append('Content-Type', 'application/json');
      let body = JSON.stringify( this.un, this.pass );
    event.preventDefault();
  
     this.http.post('http://10.129.12.61:8080/logout',
     body, { headers: authHeader})
      .subscribe(
      response => {
        console.log(response.json());
        //alert('User Created Please Login');
       
      },
      error => {
        
        console.log(error.text());
        alert('Error: User did not Log out  ');
      }
      );
}
makegetRequest() {
    this.un = this.dataservice.username;
    this.pass = this.dataservice.password;

    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' +
      btoa(this.un + ':' + this.pass ));
    event.preventDefault();
    let body = JSON.stringify( this.un, this.pass );

    this.http.get('http://10.129.12.61:8080/user/info', { headers: authHeader})
      .map((data) => data.json())
        .subscribe((data) => {
          this.infoObject = data;
           this.balance = this.infoObject.entity.balance;
          this.walletAddress = this.infoObject.entity.walletAddress;
           this.email = this.infoObject.entity.email;
          
        });
}
}
