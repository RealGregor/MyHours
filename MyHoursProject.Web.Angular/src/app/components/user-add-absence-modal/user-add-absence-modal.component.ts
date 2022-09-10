import { Component, Input, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Absence, AbsenceDefinition, User } from 'src/app/classes/project';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



import { DiscardChangesModal } from '../discard-changes-modal/discard-changes-modal.component';
import { AbsencesService } from 'src/app/services/allhours/absences.service';

declare var $: any;

@Component({
  selector: 'user-add-absence-modal-content',
  templateUrl: './user-add-absence-modal.component.html',
  styleUrls: ['./user-add-absence-modal.component.scss'],
})
export class AddUserAbsenceModalContent {
  @Input() user!: User;

  absenceDefinitions: AbsenceDefinition[] = [];

  absence: any;

  absenceForm!: FormGroup;

  absenceValidation!: FormControlValidation[];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private absencesService: AbsencesService,
  ) { }


  public get CustomProjectEnum(): typeof CustomProjectEnum {
    return (CustomProjectEnum);
  }


  ngOnInit() {
    $(document).ready(function () {
      let modalContent: any = $('.modal-content');
      modalContent.draggable({
        handle: '.modal-header',
        containment: '#content',
        scroll: false,
      });
    });

    this.absence = {UserId: this.user.Id, AbsenceDefinitionId : null, Timestamp: null, Origin: 0, Comment: null};

    this.getAbsenceDefinitions();

    this.absenceValidation = [
      new FormControlValidation(new FormControl(this.user.Id, [], null), 'UserId'),
      new FormControlValidation(new FormControl(null, [Validators.required], null), 'AbsenceDefinitionId'),
      new FormControlValidation(new FormControl(null, [Validators.required], null), 'Timestamp'),
      new FormControlValidation(new FormControl(0, [Validators.required], null), 'Origin'),
      new FormControlValidation(new FormControl(null, [], null), 'Comment'),
    ];


    this.absenceForm = new FormGroup({});

    this.absenceValidation.forEach(x => {
      this.absenceForm.addControl(x.name, x.control);
    });

  }

  getAbsenceDefinitions() {
    this.absencesService.getAbsenceDefinitions().subscribe(
      (data: AbsenceDefinition[]) => {
        console.log(data);
        this.absenceDefinitions = data;
      }
    );
  }

  saveData() {
    if (!this.absenceForm.valid) {
      return;
    }

    let absence: any = {};
    Object.assign(absence, this.absenceForm.value);

    console.log(absence);

    //TODO: parallel call, wait for BOTH to finish to close modal;
    this.absencesService
      .addAbsence(absence)
      .subscribe((data) => {
        this.activeModal.close('Save click');
      });
  }

  exitEdit() {
    if (this.detectChanges()) {
      this.modalService.open(DiscardChangesModal, {
        size: 'md',
        centered: true
      }).result.then((result) => {
        console.log(result);
        this.activeModal.dismiss("Exit without saving");
      }, (reason) => {
        console.log(reason);
      });
    } else {
      this.activeModal.dismiss("No changes");
    }
  }

  detectChanges(): boolean {
    let absence: any = {};

    Object.assign(absence, this.absenceForm.value);


    return !Object.keys(absence).filter(x => x != 'Id').every(x => {
      return absence[x as keyof typeof absence] == this.absence![x as keyof typeof this.absence];
    });
  }
}


class FormControlValidation {
  name!: keyof Absence;
  control!: FormControl;
  errorMessage!: string;

  constructor(control: FormControl, name: keyof Absence) {
    this.name = name;
    this.control = control;
  }

  controlValid(): boolean {
    let isValid = this.control.valid;

    // let a = this.control.errors[0].;

    if (!isValid) {
      this.errorMessage = JSON.stringify(this.control.errors!);
      var errorMessage = ErrorMessage[Object.keys(this.control.errors!)[0] as keyof typeof ErrorMessage]
      this.errorMessage = errorMessage;
    } else {
      this.errorMessage = "";
    }

    return isValid
  };
}

enum ErrorMessage {
  required = "Obvezno polje"
}
enum CustomProjectEnum {
  AbsenceDefinition = 1,
  Timestamp = 2,
  Origin = 3,
  Comment = 4,
}
