import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../modal/constants';
import { UserDetails } from '../modal/user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginUser: BehaviorSubject<UserDetails>;

  constructor(private httpService: HttpService) {
    this.loginUser = new BehaviorSubject<UserDetails>(JSON.parse(window.localStorage.getItem('user') || '{}'));
  }

  saveUser(userDetails: UserDetails): Observable<any> {
    return this.httpService.post(Constants.REGISTER_URL, userDetails);
  }

  login(userDetails: UserDetails) {
    let user = {
      "username": userDetails.userName,
      "password": userDetails.password
    }
    return this.httpService.postBody(Constants.LOGIN_URL, user)
  }

  setLoginUser(user: UserDetails) {
    this.loginUser.next(user);
  }

  getLoginUser() {
    return this.loginUser.value;
  }

  getUser() {
    let loginUser = JSON.parse(localStorage.getItem('user')!) || "{}";
    return loginUser;
  }

}
