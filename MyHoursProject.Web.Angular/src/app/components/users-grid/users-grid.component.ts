import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  Column,
  PipeManager,
  SortBy,
  User,
} from 'src/app/classes/project';
import { AddUserAbsenceModalContent } from '../user-add-absence-modal/user-add-absence-modal.component';
@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
})
export class UsersGridComponent implements OnInit {
  draggedColumnIndex: any;
  droppedColumnIndex: any;
  tableHeader: any;

  constructor(
    private modalService: NgbModal
  ) { }

  get PipeManager() {
    return PipeManager;
  }

  @Input()
  public columns: Column[] = [];

  @Input()
  public users: User[] | undefined;

  @Input()
  public pageData: any;

  public get sort(): typeof SortBy {
    return SortBy;
  }

  ngOnInit(): void {
  }

  beginEdit(user: User) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      size: 'md',
    };
    const modalRef = this.modalService.open(AddUserAbsenceModalContent, ngbModalOptions);
    modalRef.componentInstance.user = user;

    modalRef.result.then(
      result => {
        console.log(result);
      },
      rejectReason => {
        console.log(rejectReason);
      });
  }

  public arrayMove(arr: any, from: any, to: any) {
    let cutOut = arr.splice(from, 1)[0];
    arr.splice(to, 0, cutOut);
  }

  public dragStartColumn(index: any) {
    this.draggedColumnIndex = index;
  }

  public allowDrop(event: any) {
    event.preventDefault();
  }

  public dropColumn(index: any) {
    this.droppedColumnIndex = index;
    this.arrayMove(this.columns, this.draggedColumnIndex, index);

    localStorage.setItem('user_columns', JSON.stringify(this.columns));
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    let ths = document.getElementsByTagName('th');

    for (let i = 0; i < ths.length; i++) {
      let width = +ths[i].style.width.replace(/[^\d\.\-]/g, '');
      if (width != 0)
        this.columns[+ths[i].id - 1].width = width;
    }

    console.log(this.columns[0].width);

    localStorage.setItem('user_columns', JSON.stringify(this.columns));
  }

  public sortBy(column: Column) {
    let sort = 1;

    if (column.sortBy === SortBy.none) {
      column.sortBy = SortBy.asc;
    } else if (column.sortBy === SortBy.asc) {
      column.sortBy = SortBy.desc;
      sort = -1;
    } else if (column.sortBy === SortBy.desc) {
      column.sortBy = SortBy.asc;
    }

    this.columns.forEach((x) => {
      if (x !== column) x.sortBy = SortBy.none;
    });


    //TODO: refactor this
    localStorage.setItem('user_columns', JSON.stringify(this.columns));

    this.users?.sort((a, b) => { return a[column.mapsTo].toLowerCase() > b[column.mapsTo].toLowerCase() ? 1 * sort : -1 * sort; });

  }
}
