import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { UploadService } from '../upload.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  constructor(public modalService: NgbModal, public dialog: MatDialog, public uploadService: UploadService) {}

  public openUploadDialog() {
    const addSpouseModal = this.modalService.open(DialogComponent, {
      centered: true,
      keyboard: false,
      size: 'lg',
      backdrop: 'static',
    });
  }
}
