import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discard-changes-modal',
  templateUrl: './discard-changes-modal.component.html',
  styleUrls: ['./discard-changes-modal.component.css']
})
export class DiscardChangesModal implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit(): void {
  }

}
