import { Component, OnInit } from '@angular/core';
import { Column, ColumnSourceFrom, Page, QueryParameters, SortBy, User } from 'src/app/classes/project';
import { UserService } from 'src/app/services/allhours/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
    })
  }


  //TODO: refactor with using constructors.. dont know how to use optional parameters yet
  public columns: Column[] = [
    // From TWPR
    {
      field: 'Id',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Id',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: false
    },
    {
      field: 'First name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'FirstName',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: true,
      customSort: true
    },
    {
      field: 'Last name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'LastName',
      customMap: 'name',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: true
    },
    {
      field: 'Middle name',
      canSort: true,
      sortBy: SortBy.asc,
      mapsTo: 'MiddleName',
      // pipe: 'customUri',
      // args: ['projectUri', '_blank', 'name'],
      customClickEvent: true,
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: false
    },
    {
      field: 'Full name',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'FullName',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: true
    },
    {
      field: 'Birth date',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'BirthDate',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: false
    },
    {
      field: 'Address',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'Address',
      customMap: 'lastActivity',
      // pipe: 'latestUpdate',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: false
    },
    {
      field: 'City',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'City',
      customFormat: 'h',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: false
    },
    {
      field: 'State',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'State',
      customFormat: 'h',
      // pipe: 'remainingTime',
      sourceFrom: ColumnSourceFrom.CustomProject,
      visible: false
    },
    // Custom project data
    {
      field: 'Phone',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'Phone',
      // pipe: 'acronym',
      // args: 'WorkType',
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: false
    },
    {
      field: 'Mobile',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'Mobile',
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: false
    },
    {
      field: 'Email',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'Email',
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: true
    },
    {
      field: 'Gender',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'Gender',
      // pipe: 'customUri',
      // args: ['sharePointUri', '_blank', 'SharePointPath'],
      customClickEvent: true,
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: false
    },
    {
      field: 'Picture uri',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'PictureUri',
      // pipe: 'acronym',
      // args: 'ProjectPhase',
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: false
    },
    {
      field: 'Custom Id',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomId',
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: false
    },
    {
      field: 'CustomField1',
      canSort: true,
      sortBy: SortBy.none,
      mapsTo: 'CustomField1',
      customFormat: '%',
      sourceFrom: ColumnSourceFrom.CustomProjectData,
      visible: false
    },
    // customFinanceData
    {
      field: 'CustomField2',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField2',
      // pipe: 'customUri',
      // args: ['offerUri', '_self', 'OfferPath'],
      customClickEvent: true,
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField3',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField3',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField4',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField4',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField5',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField5',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField6',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField6',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField7',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField7',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField8',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField8',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField9',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField9',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CustomField10',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CustomField10',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'IsTimeAttendanceUser',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'IsTimeAttendanceUser',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'IsArchived',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'IsArchived',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'HasUserAccount',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'HasUserAccount',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'UserAccountId',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'UserAccountId',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CalculationStartDate',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CalculationStartDate',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    },
    {
      field: 'CalculationStopDate',
      canSort: false,
      sortBy: SortBy.none,
      mapsTo: 'CalculationStopDate',
      customFormat: '€',
      sourceFrom: ColumnSourceFrom.CustomFinanceData,
      visible: false
    }
  ]


  public users: User[] | undefined;

  public filterText : string = '';

  page: number = 1;
  pageSize: number = 50;

  private selectedTags: number[] = [];

  pageSizes: number[] = [25, 50, 100, 200];




  twpColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.CustomProject);
  customProjectColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.CustomProjectData);
  customFinanceColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.CustomFinanceData);


  saveColumnPreferences(column: Column) {
    column.visible = !column.visible;
  }

  //Pagination not implemented on API
  setPageSize(pageSize: number) {
    this.pageSize = pageSize;

    // let queryParams: QueryParameters = JSON.parse(localStorage.getItem("queryParameters") ?? '{}');

    // if (queryParams.twpParameters) {
    //   queryParams.twpParameters.pageSize = this.pageSize;
    // } else {
    //   queryParams =
    //   {
    //     twpParameters: { tags: this.selectedTags, pageSize: this.pageSize }
    //   }
    // }

    // localStorage.setItem('queryParameters', JSON.stringify(queryParams));
    // this.getProjects(queryParams);
  }

  // exportCSV() {
  //   let headers: string[] = [];
  //   let keys: (keyof CustomProject)[] = [];

  //   this.columns.filter(x => x.visible).map(x => { headers.push(x.field), keys.push(x.customMap as keyof CustomProject || x.mapsTo as keyof CustomProject) });
  //   let data = this.redux(this.projects, keys);

  //   data.forEach((x: any) => {
  //     Object.keys(x).forEach((key) => {
  //       x[key] = x[key]?.toString();
  //     })
  //   });



  //   var options = {
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: false,
  //     title: '',
  //     useBom: true,
  //     noDownload: false,
  //     headers: headers,
  //     useHeader: false,
  //     nullToEmptyString: true,
  //   };


  //   new AngularCsv(data, 'ExportedData', options);
  // }

  redux = (array: any, keys: any) => array.map((o: any) => keys.reduce((acc: any, curr: any) => {
    acc[curr] = o[curr];
    return acc;
  }, {}));

  public test(queryParameters: QueryParameters = { twpParameters: {} }): void {
    queryParameters.twpParameters!.tags ??= this.selectedTags;
    queryParameters.twpParameters!.pageSize ??= this.pageSize;
    queryParameters.twpParameters!.page ??= this.page;

    localStorage.setItem('queryParameters', JSON.stringify(queryParameters));

    // this.getProjects(queryParameters);
  }
}
