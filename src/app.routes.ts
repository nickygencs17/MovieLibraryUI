import { Routes } from '@angular/router';
import { CustomerHome } from './customerhome';
import { EmployeeHome } from './employeehome';
import { AdminHome } from './adminhome';
import { Login } from './login';
import { Signup } from './signup';
import { AuthGuard } from './common/auth.guard';
import { EqualValidator } from './equal-validator.directive';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'customerhome',   component: CustomerHome },
  { path: 'employeehome',   component: EmployeeHome },
  { path: 'adminhome',   component: AdminHome},
  { path: '**',     component: Login },
];
