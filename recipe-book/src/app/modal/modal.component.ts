import {Component, ElementRef, Input, OnInit, OnDestroy, HostListener} from '@angular/core';
import {ModalService} from '../modal.service';
import {DataStorageService} from '../shared/data-storage.service';



@Component({
  selector: 'jw-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  errorMassage = '';
  private element: any;

  constructor(private modalService: ModalService,
              private el: ElementRef,
              private dataStorageService: DataStorageService) {
    this.element = el.nativeElement;

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'jw-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.errorMassage = this.dataStorageService.error;
}

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }

  @HostListener('document:keyup', ['$event']) KeyboardEvent(event: KeyboardEvent) {
   if (event.keyCode === 27) {
      this.close();
    }
  }
}
