import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Constants } from '../modal/constants';
import { UserDetails } from '../modal/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) { }

  saveUser(userDetails: UserDetails): Observable<any> {
    return this.httpService.post(Constants.REGISTER_URL, userDetails);
  }
}
