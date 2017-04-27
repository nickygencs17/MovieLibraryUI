import { Routes } from '@angular/router';
import { CustomerHome } from './customerhome';
import { EmployeeHome } from './employeehome';
import { AdminHome } from './adminhome';
import { Login } from './login';
import { AuthGuard } from './common/auth.guard';
import { EqualValidator } from './equal-validator.directive';
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

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'customerhome',   component: CustomerHome },
  { path: 'employeehome',   component: EmployeeHome },
  { path: 'adminhome',   component: AdminHome},
  { path: 'adminmovieservices',     component: AdminMovieServices},
  { path: 'adminemployeeservices',  component: AdminEmployeeServices},
  { path: 'admincustomerservices',  component: AdminCustomerServices},
  { path: 'adminhelpservices',    component: AdminHelpServices},
  { path: 'employeecustomerservices',  component: EmployeeCustomerServices},
  { path: 'employeeorderservices', component: EmployeeOrderServices},
  { path: 'employeehelpservices',    component: EmployeeHelpServices},
  { path: 'customeraccountservices', component: CustomerAccountServices},
  { path: 'customermovieservices',    component: CustomerMovieServices},
  { path: 'customerhelpservices',    component: CustomerHelpServices},
  { path: 'addmovie',    component: AddMovie},
  { path: 'editmovie',    component: EditMovie},
  { path: '**',     component: Login }


];




