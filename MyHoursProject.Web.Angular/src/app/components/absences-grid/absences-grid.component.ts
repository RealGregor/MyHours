import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {
  Absence,
  AbsenceColumn,
  PipeManager,
  SortBy,
} from 'src/app/classes/project';
@Component({
  selector: 'app-absences-grid',
  templateUrl: './absences-grid.component.html',
  styleUrls: ['./absences-grid.component.scss'],
})
export class AbsencesGridComponent implements OnInit {
  draggedColumnIndex: any;
  droppedColumnIndex: any;
  tableHeader: any;

  constructor() { }

  get PipeManager() {
    return PipeManager;
  }

  @Input()
  public columns: AbsenceColumn[] = [];

  @Input()
  public absences: Absence[] | undefined;

  @Input()
  public pageData: any;

  public get sort(): typeof SortBy {
    return SortBy;
  }

  ngOnInit(): void {
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
        this.columns[+ths[i].id - 1].width = width;
    }

    console.log(this.columns[0].width);

    localStorage.setItem('absence_columns', JSON.stringify(this.columns));
  }

  public sortBy(column: AbsenceColumn) {
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

    this.absences?.sort((a, b) => { return a[column.mapsTo].toLowerCase() > b[column.mapsTo].toLowerCase() ? 1 * sort : -1 * sort; });
  }
}
