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

  saveUser(userDetails: FormData): Observable<any> {
    return this.httpService.postMultipart(Constants.REGISTER_URL, userDetails);
  }

  updateProfilePhoto(formData: FormData): Observable<any> {
    return this.httpService.postMultipart(Constants.UPLOAD_IMAGE_URL, formData);
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

  removeLoginUser() {
    localStorage.removeItem("user");
    this.loginUser.next(new UserDetails());
  }

  getUser() {
    let loginUser = JSON.parse(localStorage.getItem('user')!) || "{}";
    return loginUser;
  }

}
