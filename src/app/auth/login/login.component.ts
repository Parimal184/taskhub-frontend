import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/modal/user-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  userDetails!: UserDetails;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.userDetails = JSON.parse(localStorage.getItem('user')!);

    if(this.userDetails.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    
    var currentUser = this.loginForm.value;

    if(currentUser.email === this.userDetails.email) {
      console.log("login succesfully !!!!")
      this.userDetails.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(this.userDetails));
      this.router.navigate(['/home'])
    }

  }

  get formData() { return this.loginForm.controls; }

}
