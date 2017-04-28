import { Location } from './location';

export interface Customer {
  address: string;
  firstname: string;
  lastname: string;
  location: Location;
  password: string;
  ssn: number;
  telephone: number;
}
