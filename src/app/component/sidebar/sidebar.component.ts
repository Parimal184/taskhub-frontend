import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebarService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showSidebar!: boolean;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.showSidebar = this.sidebarService.shouldShowSidebar();
  }
}
