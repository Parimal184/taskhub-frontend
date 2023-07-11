import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/modal/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  userDetails!: UserDetails;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });

  }

   get formData() { return this.loginForm.controls; }

  login() {
    
    let currentUser = this.loginForm.value;

    if (this.loginForm.valid) {
      console.log("login succesfully !!!!",)
      
      this.userService.login(currentUser)
      .subscribe({
        next: (response) => {
          console.log("login ::", response);
          this.router.navigate(['/home']);
        }
      })
      
    }

  }

 

}
