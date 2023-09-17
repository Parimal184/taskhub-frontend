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
  isUploaded: boolean = false;
  isFileUpdated: boolean = false;
  progress: any = 0;

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

      const interval = setInterval(() => {
        this.progress += 10;
        if(this.progress >= 100) {
          clearInterval(interval);
          this.imageURL = reader.result as string;
        }
      }, 100);

      setTimeout(() => {
        this.progress = 0;
      }, 3000);
      
    }
    this.isFileUpdated = true;
    reader.readAsDataURL(this.selectedFile);
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
        this.isFileUpdated = false;
        this.isUploaded = true;
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
