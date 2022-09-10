import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Column, ColumnSourceFrom, SortBy, User } from 'src/app/classes/project';
import { UsersService } from 'src/app/services/allhours/users.service';
import { AddUserModalContent } from '../user-add-modal/user-add-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private usersService: UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.columns.forEach((x) => {
			x.sortBy = SortBy.none;
		  });
    this.getUsers();
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    })
  }


  //TODO: refactor with using constructors.. dont know how to use optional parameters yet
  public columns: Column[] =  localStorage.getItem('user_columns') ? JSON.parse(localStorage.getItem('user_columns')!) : [
    {
      field: 'Id',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Id',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'First name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'FirstName',
      sourceFrom: ColumnSourceFrom.User,
      visible: true,
    },
    {
      field: 'Last name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'LastName',
      sourceFrom: ColumnSourceFrom.User,
      visible: true
    },
    {
      field: 'Middle name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'MiddleName',
      customClickEvent: true,
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'Full name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'FullName',
      sourceFrom: ColumnSourceFrom.User,
      visible: true
    },
    {
      field: 'Birth date',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'BirthDate',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'Address',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Address',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'City',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'City',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'State',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'State',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    // Custom project data
    {
      field: 'Phone',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Phone',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'Mobile',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Mobile',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'Email',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Email',
      sourceFrom: ColumnSourceFrom.User,
      visible: true
    },
    {
      field: 'Gender',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Gender',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'Picture uri',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'PictureUri',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'Custom Id',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomId',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField1',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField1',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    // customFinanceData
    {
      field: 'CustomField2',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField2',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField3',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField3',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField4',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField4',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField5',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField5',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField6',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField6',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField7',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField7',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField8',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField8',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField9',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField9',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CustomField10',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField10',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'IsTimeAttendanceUser',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'IsTimeAttendanceUser',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'IsArchived',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'IsArchived',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'HasUserAccount',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'HasUserAccount',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'UserAccountId',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'UserAccountId',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CalculationStartDate',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CalculationStartDate',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    },
    {
      field: 'CalculationStopDate',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CalculationStopDate',
      sourceFrom: ColumnSourceFrom.User,
      visible: false
    }
  ]


  public users: User[] | undefined;

  public filterText: string = '';

  page: number = 1;
  pageSize: number = 50;

  pageSizes: number[] = [25, 50, 100, 200];

  userColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.User);

  addUser() {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      size: 'md',
    };
    const modalRef = this.modalService.open(AddUserModalContent, ngbModalOptions);

    modalRef.result.then(
      result => {
        this.getUsers();
      },
      rejectReason => {
        console.log(rejectReason);
      });
  }

  saveColumnPreferences(column: Column) {
    column.visible = !column.visible;
  }

  //Pagination not implemented on API
  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  redux = (array: any, keys: any) => array.map((o: any) => keys.reduce((acc: any, curr: any) => {
    acc[curr] = o[curr];
    return acc;
  }, {}));
}
