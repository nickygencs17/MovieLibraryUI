import { Routes } from '@angular/router';
import { UserHome } from './userhome';
import { AdminHome } from './adminhome';
import { Login } from './login';
import { Signup } from './signup';
import { AuthGuard } from './common/auth.guard';
import { EqualValidator } from './equal-validator.directive';

export const routes: Routes = [
  { path: '',       component: Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'userhome',   component: UserHome },
  { path: 'adminhome',   component: AdminHome},
  { path: '**',     component: Login },
];
