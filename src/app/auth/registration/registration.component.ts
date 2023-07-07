import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmPassword]]
    }, {
      validators : this.confirmPassword
    });

  }

  confirmPassword(control: AbstractControl) {
    const password = control.get('password');
    const confPassword = control.get('confirmPassword');

    if (password && confPassword && password.value !== confPassword.value) {
      return { 'passwordMisMatch': true };
    }

    return null;
  }

  register() {

    this.isSubmitted = true;
    if(this.registerForm.valid) {
      console.log("Submitted!!", this.registerForm.value);

      this.firebaseService.addUser(this.registerForm.value).
      then(() => {
        console.log("Data saved success!!");
        this.router.navigate(['login']);
      })
    }
    
  }

  get formData() { return this.registerForm.controls; }
  
}
