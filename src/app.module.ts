import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EqualValidator } from './equal-validator.directive';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { MyService } from './service/myservice';
import { DataService } from './service/dataservice';

import { AuthGuard } from './common/auth.guard';
import { CustomerHome } from './customerhome';
import { EmployeeHome } from './employeehome';
import { AdminHome } from './adminhome';
import { Login } from './login';
import { App } from './app';

import { routes } from './app.routes';
import { AdminMovieServices } from './adminmovieservices';
import { AdminEmployeeServices } from './adminemployeeservices';
import { AdminCustomerServices } from './admincustomerservices';
import { AdminHelpServices } from './adminhelpservices';
import { EmployeeCustomerServices } from './employeecustomerservices';
import { EmployeeOrderServices } from './employeeorderservices';
import { EmployeeHelpServices } from './employeehelpservices';
import { CustomerAccountServices } from './customeraccountservices';
import { CustomerMovieServices } from './customermovieservices';
import { CustomerHelpServices } from './customerhelpservices';
import { AddMovie } from './addmovie';
import { EditMovie } from './editmovie';
import { AddEmployee } from './addemployee';
import { EditEmployee} from './editemployee';
import { AddCustomer } from './addcustomer';
import { EditCustomer} from './editcustomer';

@NgModule({
  bootstrap: [App],
  declarations:
  [ AdminHome,
  CustomerHome,
  EmployeeHome,
  Login,
  App,
  EqualValidator,
  AdminMovieServices,
  AdminEmployeeServices,
  AdminCustomerServices,
  AdminHelpServices,
  EmployeeCustomerServices,
  EmployeeOrderServices,
  EmployeeHelpServices,
  CustomerAccountServices,
  CustomerMovieServices,
  CustomerHelpServices,
  AddMovie,
  EditMovie,
  AddEmployee,
  EditEmployee,
  AddCustomer,
  EditCustomer
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })],
  providers: [
    AuthGuard, ...AUTH_PROVIDERS, MyService, DataService
  ]
})
export class AppModule { }
