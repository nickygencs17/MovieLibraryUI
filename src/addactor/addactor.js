"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var styles = require('./addactor.css');
var template = require('./addactor.html');
var AddActor = (function () {
    function AddActor(router, http, dataservice) {
        this.router = router;
        this.http = http;
        this.dataservice = dataservice;
        this.validForm = true;
    }
    AddActor.prototype.employeeCustomerServices = function (event) {
        this.router.navigate(['adminmovieservices']);
    };
    AddActor.prototype.addActor = function ($event, name, age, sex, rating) {
        this.object = {
            name: name,
            age: parseInt(age),
            sex: sex,
            rating: parseInt(rating)
        };
        console.log(this.object);
        this.postActor();
    };
    AddActor.prototype.postActor = function () {
        var authHeader = new http_1.Headers();
        authHeader.append('Authorization', 'Basic ' +
            btoa(this.dataservice.username + ':' + this.dataservice.password));
        authHeader.append('Content-Type', 'application/json');
        var body = this.object;
        event.preventDefault();
        this.http.post('http://localhost:8080/storage/manager/actor', body, { headers: authHeader })
            .subscribe(function (response) {
            console.log(response.json());
            alert('Created');
        }, function (error) {
            console.log(error.text());
            alert("Please Make sure your id is valid\n        {\n                   {\n  \"age\": 0,\n  \"id\": 0,\n  \"name\": \"string\",\n  \"rating\": 0,\n  \"sex\": \"string\"\n}");
        });
    };
    AddActor = __decorate([
        core_1.Component({
            selector: 'addactor',
            template: template,
            styles: [styles]
        })
    ], AddActor);
    return AddActor;
}());
exports.AddActor = AddActor;
