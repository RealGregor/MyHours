import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User} from 'src/app/classes/project';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { DiscardChangesModal } from '../discard-changes-modal/discard-changes-modal.component';
import { UsersService } from 'src/app/services/allhours/users.service';

declare var $: any;

@Component({
  selector: 'user-add-modal-content',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss'],
})
export class AddUserModalContent {
  @Input() user: User = new User();

  userForm!: FormGroup;

  userValidation!: FormControlValidation[];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private usersService: UsersService
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

    this.userValidation = [
      new FormControlValidation(new FormControl(this.user.FirstName, [Validators.required], null), 'FirstName'),
      new FormControlValidation(new FormControl(this.user.LastName, [Validators.required], null), 'LastName'),
      new FormControlValidation(new FormControl(this.user.Email, [Validators.required, Validators.email], null), 'Email'),
    ];


    this.userForm = new FormGroup({});

    this.userValidation.forEach(x => {
      this.userForm.addControl(x.name, x.control);
    });

  }

  addUser() {
    if (!this.userForm.valid) {
      return;
    }

    Object.assign(this.user, this.userForm.value);


    this.usersService.createUser(this.user).subscribe({
        next: (data) => {
          console.log(data);
          this.activeModal.close('Save click');
        },
        error: (error) => {
          alert(error);
        }
      });

    //TODO: parallel call, wait for BOTH to finish to close modal;
    // this.saveCustomProjectData(customProjectData);
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
    let userData: User = new User;

    Object.assign(userData, this.userForm.value);

    return !Object.keys(userData).filter(x => x != 'Id').every(x => {
      return userData[x as keyof typeof userData] == this.user[x as keyof typeof this.user];
    });
  }
}


class FormControlValidation {
  name!: keyof User;
  control!: FormControl;
  errorMessage!: string;

  constructor(control: FormControl, name: keyof User) {
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
  required = "Obvezno polje",
  email = "Neveljaven email naslov",
}

enum CustomProjectEnum {
  FirstName = 0,
  LastName = 1,
  Email = 2,
}