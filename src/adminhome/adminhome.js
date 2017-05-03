"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var myservice_1 = require('../service/myservice');
var http_1 = require('@angular/http');
var styles = require('./adminhome.css');
var template = require('./adminhome.html');
var AdminHome = (function () {
    function AdminHome(router, http, dataservice) {
        this.router = router;
        this.http = http;
        this.dataservice = dataservice;
        this.path = 'http://localhost:8080/storage/manager/';
        this.edited = true;
    }
    AdminHome.prototype.logout = function (event) {
        this.router.navigate(['login']);
    };
    AdminHome.prototype.adminMovieServices = function (event) {
        this.router.navigate(['adminmovieservices']);
    };
    AdminHome.prototype.adminEmployeeServices = function (event) {
        this.router.navigate(['adminemployeeservices']);
    };
    AdminHome.prototype.adminCustomerServices = function (event) {
        this.router.navigate(['admincustomerservices']);
    };
    AdminHome.prototype.getSalesReport = function (event, month) {
        var _this = this;
        var authHeader = new http_1.Headers();
        authHeader.append('Authorization', 'Basic ' +
            btoa(this.dataservice.username + ':' + this.dataservice.password));
        authHeader.append('Content-Type', 'application/json');
        this.http.get(this.path + 'sales/' + month, { headers: authHeader })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            console.log(data);
            _this.salesReportTotal = data.entity.toString();
        }, function (error) {
            if (error.status === 404) {
                alert('Movie Name Not Found');
            }
            else if (error.status === 400) {
                alert('Please Enter a Valid Interger');
            }
            else if (error.status === 401) {
                alert('Please Enter a Valid Interger');
            }
            else if (error.status === 500) {
                alert('Please Enter a Valid Interger');
            }
            else {
                alert('Uknown Error Check Log');
            }
        });
        this.edited = false;
    };
    AdminHome = __decorate([
        core_1.Component({
            selector: 'adminhome',
            template: template,
            styles: [styles],
            providers: [myservice_1.MyService]
        })
    ], AdminHome);
    return AdminHome;
}());
exports.AdminHome = AdminHome;
