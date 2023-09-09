import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { SidebarService } from 'src/app/services/sidebarService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showSidebar!: boolean;

  constructor(private taskModalService: ModalService,private sidebarService: SidebarService) { }

  ngOnInit() {
    this.showSidebar = this.sidebarService.shouldShowSidebar();
  }

  openTaskModal(taskId: number) {
    this.taskModalService.openTaskModal(taskId);
  }
}
