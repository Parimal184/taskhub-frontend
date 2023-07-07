import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { UserDetails } from '../modal/user-details';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFireDatabase) { }

  addUser(userDetails: any) {
    return this.firebase.list('users').push(userDetails);
  }

  getUsers() {
    return this.firebase.list('users').valueChanges();
  }
}
