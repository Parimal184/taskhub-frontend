import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../component/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openErrorModal(errorMessage: string) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.errorMessage = errorMessage;
  }

}
