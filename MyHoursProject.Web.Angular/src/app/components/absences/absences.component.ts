import { Component, OnInit } from '@angular/core';
import { Absence, AbsenceColumn, ColumnSourceFrom, SortBy } from 'src/app/classes/project';
import { AbsencesService } from 'src/app/services/allhours/absences.service';

@Component({
	selector: 'app-absences',
	templateUrl: './absences.component.html',
	styleUrls: ['./absences.component.scss']
})

export class AbsencesComponent implements OnInit {

	startDate?: any = this.formatDate(new Date(), 0);
	endDate?: any = this.formatDate(new Date(), 7);



	constructor(private absencesService: AbsencesService) { }

	ngOnInit(): void {
		this.columns.forEach((x) => {
			x.sortBy = SortBy.none;
		  });
	}

	getAbsences() {
		this.absences = undefined;
		this.absencesService.getAbsences({ startDate: this.startDate?.toString(), endDate: this.endDate?.toString() }).subscribe((data) => {
			console.log(data);
			this.absences = data;
		})
	}

	padTo2Digits(num: any) {
		return num.toString().padStart(2, '0');
	}

	formatDate(date = new Date(), add: number) {
		date.setDate(date.getDate() + add);
		return [
			date.getFullYear(),
			this.padTo2Digits(date.getMonth() + 1),
			this.padTo2Digits(date.getDate()),
		].join('-');
	}


	//TODO: refactor with using constructors.. dont know how to use optional parameters yet
	public columns: AbsenceColumn[] =  localStorage.getItem('absence_columns') ? JSON.parse(localStorage.getItem('absence_columns')!) :[
		// From TWPR
		{
			field: 'Id',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'Id',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'User Id',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'UserId',
			sourceFrom: ColumnSourceFrom.User,
			visible: false,
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
			field: 'Middle name',
			canSort: true,
			sortBy: SortBy.none,
			mapsTo: 'MiddleName',
			customClickEvent: true,
			sourceFrom: ColumnSourceFrom.User,
			visible: false
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
			field: 'Timestamp',
			canSort: true,
			sortBy: SortBy.none,
			mapsTo: 'Timestamp',
			pipe: 'date',
			args: 'mediumDate',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: true
		},
		{
			field: 'Absence definition Id',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'AbsenceDefinitionId',
			sourceFrom: ColumnSourceFrom.AbsenceDefinition,
			visible: false
		},
		{
			field: 'Absence definition name',
			canSort: true,
			sortBy: SortBy.none,
			mapsTo: 'AbsenceDefinitionName',
			sourceFrom: ColumnSourceFrom.AbsenceDefinition,
			visible: true
		},
		{
			field: 'Inserted on',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'InsertedOn',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Origin',
			canSort: true,
			sortBy: SortBy.none,
			mapsTo: 'Origin',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		// Custom project data
		{
			field: 'Origin display name',
			canSort: true,
			sortBy: SortBy.none,
			mapsTo: 'OriginDisplayName',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Comment',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'Comment',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Icon Id',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'IconId',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Is calculated',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'IsCalculated',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Status',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'Status',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Approval request',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'ApprovalRequest',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		// customFinanceData
		{
			field: 'Partial time from',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'PartialTimeFrom',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Partial time to',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'PartialTimeTo',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Partial time duration',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'PartialTimeDuration',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Is partial',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'IsPartial',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Override holiday absence',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'OverrideHolidayAbsence',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Is modified',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'IsModified',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Modified by user',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'ModifiedByUser',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		},
		{
			field: 'Modified on',
			canSort: false,
			sortBy: SortBy.none,
			mapsTo: 'ModifiedOn',
			sourceFrom: ColumnSourceFrom.Absence,
			visible: false
		}
	]

	public absences: Absence[] | undefined = [];

	page: number = 1;
	pageSize: number = 50;

	pageSizes: number[] = [25, 50, 100, 200];


	userColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.User);
	absenceColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.Absence);
	absenceDefinitionColumns = this.columns.filter(c => c.sourceFrom === ColumnSourceFrom.AbsenceDefinition);

	saveColumnPreferences(column: AbsenceColumn) {
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