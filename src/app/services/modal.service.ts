import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../component/modal/modal.component';
import { TaskComponent } from '../component/task/task.component';
import { ProfileComponent } from '../component/profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openTaskModal(taskId: number) {
    const modalRef = this.modalService.open(TaskComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.taskId = taskId;
  }

  openEditProfileModal() {
    const modalRef = this.modalService.open(ProfileComponent, { centered: true, size: 'md' });
  }

  closeTaskModal() {
    this.modalService.dismissAll();
  }

}
