import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { UserDetails } from 'src/app/modal/user-details';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  userDetails!: UserDetails;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.router.navigateByUrl("")
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get formData() { return this.loginForm.controls; }

  onLogin() {
    if (this.loginForm.valid) {
      let currentUser = this.loginForm.value;
      this.userService.login(currentUser)
        .pipe(first())
        .subscribe({
          next: (response) => {
            this.userDetails = response.body;
            this.userDetails.token = response.headers.get('Jwt-Token');
            localStorage.setItem('user', JSON.stringify(this.userDetails));
            this.userService.setLoginUser(this.userDetails);
            this.router.navigateByUrl('');
          }
        })
    }

  }



}
