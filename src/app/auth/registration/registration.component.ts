import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/modal/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm!: FormGroup;
  isSubmitted: boolean = false;
  selectedFile!: File;
  imageURL!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private userSerice: UserService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.confirmPassword]],
    }, {
      validators : this.confirmPassword
    });

  }

  onImageUpload(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("file :", this.selectedFile)
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }

    reader.readAsDataURL(this.selectedFile)
  }

  confirmPassword(control: AbstractControl) {
    const password = control.get('password');
    const confPassword = control.get('confirmPassword');

    if (password && confPassword && password.value !== confPassword.value) {
      return { 'passwordMisMatch': true };
    }

    return null;
  }

  onSignup() {
    this.isSubmitted = true;
    if(this.registerForm.valid) {
      let formDataJson: FormData = new FormData();
      
      if(this.selectedFile) {
        formDataJson.append('profilePhoto', this.selectedFile);
      }

      let userDetails: any = this.registerForm.value;
      userDetails.profilePhotoUrl = this.imageURL;

      userDetails = new Blob([JSON.stringify(userDetails)], {
        type: 'application/json',
      }); 
      formDataJson.append('userDetails',userDetails);
      this.userSerice.saveUser(formDataJson).
        subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          }
        })
    }
    
  }

  get formData() { return this.registerForm.controls; }
  
}
