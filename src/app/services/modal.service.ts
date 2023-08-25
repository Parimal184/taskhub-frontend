import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../component/modal/modal.component';
import { TaskComponent } from '../component/task/task.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openTaskModal(taskId: number) {
    const modalRef = this.modalService.open(TaskComponent, { centered: true });
    modalRef.componentInstance.taskId = taskId;
  }

  closeTaskModal() {
    this.modalService.dismissAll();
  }

}
