import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/modal/user-details';
import { ModalService } from 'src/app/services/modal.service';
import { SidebarService } from 'src/app/services/sidebarService';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showSidebar!: boolean;
  isProfileOptionsOpen = false;
  loginUser!: UserDetails;
  greetings!: string;
  isNavBarOpen: boolean = false;

  @ViewChild('navIcon') navIconElement!: ElementRef;
  @ViewChild('profileImage') profileImageElement!: ElementRef;

  constructor(private userService: UserService, private router: Router, private elementRef: ElementRef, private taskService: TaskService, private taskModalService: ModalService,private sidebarService: SidebarService) { }

  ngOnInit() {
    this.loginUser = this.userService.getLoginUser();
    this.showSidebar = this.sidebarService.shouldShowSidebar();
    let interval = 0;

    if(this.greetings) {
      interval = 10000
    }

    setInterval(() => {
      let hours = new Date().getHours();

      if(hours >= 12) {
        this.greetings = "Good afternoon, ";
      } else if(hours >= 16) {
        this.greetings = "Good evening, ";
      } else {
        this.greetings = "Good morning, ";
      }
      
    }, interval);
  }

  openTaskModal(taskId: number) {
    this.taskModalService.openTaskModal(taskId);
  }

  openEditProfileModal() {
    this.taskModalService.openEditProfileModal();
  }

  toggleProfileOptions() {
    this.isProfileOptionsOpen = !this.isProfileOptionsOpen;
  }

  isUserLoggedIn() {
    return Object.keys(this.userService.getLoginUser()).length === 0 ? false : true;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (event.target !== this.navIconElement.nativeElement) {
      this.isNavBarOpen = false;
    }

    if(event.target !== this.profileImageElement.nativeElement) {
      this.isProfileOptionsOpen = false;
    }
  }

  logout() {
    this.userService.removeLoginUser();
    this.taskService.clearCacheSubject();
    this.router.navigateByUrl("/login");
  }

  toggleNav() {
    this.isNavBarOpen =! this.isNavBarOpen;
  }
}
