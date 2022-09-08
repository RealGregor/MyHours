import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  Column,
  ColumnSourceFrom,
  CustomFinanceData,
  CustomProject,
  CustomProjectData,
  nameof,
  Page,
  PipeManager,
  QueryParameters,
  SortBy,
  Tag,
  User,
} from 'src/app/classes/project';
import { CustomProjectDataService } from 'src/app/services/projectData/custom-project-data.service';
import { CustomFinanceDataService } from 'src/app/services/financeData/custom-finance-data.service';
import { ProjectsService } from 'src/app/services/allhours/projects.service';
import { NgbdModalContent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
})
export class ProjectsGridComponent implements OnInit {
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
  public users: User[] = [];

  @Input()
  public pageData?: Page;

  @Output()
  projectDataChanged: EventEmitter<QueryParameters> = new EventEmitter();
  queryParameters: QueryParameters = {}


  public get sort(): typeof SortBy {
    return SortBy;
  }

  ngOnInit(): void {
  }

  beginEdit(project: User) {
    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      scrollable: true,
      size: 'lg',
    };
    const modalRef = this.modalService.open(NgbdModalContent, ngbModalOptions);
    modalRef.componentInstance.project = project;

    modalRef.result.then(
      result => {
        if (localStorage.getItem('queryParameters')) {
          let queryParameters = JSON.parse(
            localStorage.getItem('queryParameters')!
          );
          this.projectDataChanged.emit(queryParameters);
        } else {
          this.projectDataChanged.emit();
        }
      },
      rejectReason => {

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

    localStorage.setItem('columns', JSON.stringify(this.columns));
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: any) {
    let ths = document.getElementsByTagName('th');

    for (let i = 0; i < ths.length; i++) {
      let width = +ths[i].style.width.replace(/[^\d\.\-]/g, '');
      if (width != 0)
        this.columns[i].width = width;
    }

    console.log(this.columns[0].width);

    localStorage.setItem('columns', JSON.stringify(this.columns));
  }

  public sortBy(column: any) {
    // let index = (Object.keys(SortBy).indexOf(column.sortBy) + 1) % (Object.keys(SortBy).length/2);
    // column.sortBy = SortBy[index];
    if (column.sortBy === SortBy.none) {
      column.sortBy = SortBy.asc;
    } else if (column.sortBy === SortBy.asc) {
      column.sortBy = SortBy.desc;
    } else if (column.sortBy === SortBy.desc) {
      column.sortBy = SortBy.asc;
    }

    this.columns.forEach((x) => {
      if (x !== column) x.sortBy = SortBy.none;
    });


    // let queryParameters: QueryParameters = this.getQueryParameters(column);

    //TODO: refactor this
    localStorage.setItem('columns', JSON.stringify(this.columns));

    // this.projectDataChanged.emit(queryParameters);
  }

  changePage(pageNumber: number) {
    let queryParameters: QueryParameters = {
      twpParameters: { page: pageNumber },
      projectDataParameters: {},
      financeDataParameters: undefined,
    };
    this.projectDataChanged.emit(queryParameters);
  }

  // private getQueryParameters(column: Column): QueryParameters {
  //   let queryParameters: QueryParameters = {
  //     twpParameters: {},
  //     projectDataParameters: {},
  //     financeDataParameters: {},
  //   };

  //   if (column.sortBy != SortBy.none) {
  //     switch (column.sourceFrom) {
  //       case ColumnSourceFrom.CustomProjectData: {
  //         queryParameters.projectDataParameters!.orderBy =
  //           column.customMap || nameof<CustomProject>(column.mapsTo);
  //         queryParameters.projectDataParameters!.orderMode = column.sortBy;
  //         break;
  //       }
  //       case ColumnSourceFrom.CustomProject:
  //         {
  //           queryParameters.twpParameters!.remainingTimeSort = column.remainingTimeSort;
  //           queryParameters.twpParameters!.customSort = column.customSort;
  //           queryParameters.twpParameters!.customSortField = column.mapsTo;
  //           queryParameters.twpParameters!.orderBy =
  //             column.customMap || nameof<CustomProject>(column.mapsTo);
  //           queryParameters.twpParameters!.orderMode = column.sortBy;
  //         }
  //         break;
  //     }
  //   }
  //   return queryParameters;
  // }
}
