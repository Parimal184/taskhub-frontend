import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetails } from 'src/app/modal/user-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  loginUser!: UserDetails;
  selectedFile: any;
  imageURL!: string;
  successMessage: boolean = false;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {}

  ngOnInit() {
    this.loginUser = this.userService.getLoginUser();
    this.imageURL = this.loginUser.profileImageUrl;
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

  updateProfilePhoto() {
    let formDataJson: FormData = new FormData();
      
    if(this.selectedFile) {
      formDataJson.append('profilePhoto', this.selectedFile);
      formDataJson.append('userEmail', this.loginUser.email)
    }

    this.userService.updateProfilePhoto(formDataJson)
    .subscribe({
      next: (response) => {
        console.log("response image :", response);
        this.loginUser.profileImageUrl = response.updatedImageURL;
        this.userService.setLoginUser(this.loginUser);
      }
    })

  }

  closeTaskModal() {
    this.activeModal.dismiss();
  }
}
