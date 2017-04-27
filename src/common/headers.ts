import { Headers } from '@angular/http';
import { DataService } from '../service/dataservice';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

