import { DatePipe } from '@angular/common';


export class PipeManager {
  private static _pipes: any = {
    'date': DatePipe,
  };

  public static PipeForKey(key: string) {
    return PipeManager._pipes[key];
  }
}

export enum SortBy {
  none = 0,
  asc = 1,
  desc = 2,
}

export enum ColumnSourceFrom {
  User = 0,
  Absence = 1,
  AbsenceDefinition = 2
}

export abstract class ColumnBase {
  field!: string;
  visible!: boolean;
  canSort: boolean = false;
  customSort?: boolean = false;
  sortBy: SortBy = SortBy.none;
  mapsTo!: any;
  sourceFrom!: ColumnSourceFrom;
  customMap?: string;
  pipe?: any;
  customClickEvent?: boolean
  customFormat?: string
  args?: any;
  width?: number;
}

export abstract class Column extends ColumnBase {
  override mapsTo!: keyof User;
}

export abstract class AbsenceColumn extends ColumnBase {
  override mapsTo!: keyof Absence;
}

export class User {
  Id!: string;
  FirstName!: string;
  LastName!: string;
  MiddleName?: any;
  FullName!: string;
  BirthDate?: any;
  Address?: any;
  City?: any;
  State?: any;
  Phone?: any;
  Mobile?: any;
  Email!: string;
  Gender!: string;
  PictureUri?: any;
  CustomId?: any;
  CustomField1?: any;
  CustomField2?: any;
  CustomField3?: any;
  CustomField4?: any;
  CustomField5?: any;
  CustomField6?: any;
  CustomField7?: any;
  CustomField8?: any;
  CustomField9?: any;
  CustomField10?: any;
  IsTimeAttendanceUser!: boolean;
  IsArchived!: boolean;
  HasUserAccount!: boolean;
  UserAccountId?: any;
  CalculationStartDate?: any;
  CalculationStopDate?: any;
}

export interface AbsenceDefinition {
  Id: string;
  Name: string;
  IntegrationId: number;
  Code: number;
  Type: number;
  IsAvailableForAdminsOnly: boolean;
  CategoryDefinitionId: string;
  CategoryDefinitionName: string;
  Fraction: number;
}

export class Absence {
  Id: string = ""
  UserId: string = ""
  FirstName: string = ""
  MiddleName?: string
  LastName: string = ""
  Timestamp: string = ""
  AbsenceDefinitionId: string = ""
  AbsenceDefinitionName: string = ""
  InsertedOn: string = ""
  Origin: number = 0
  OriginDisplayName: string = ""
  Comment?: string
  IsAuthentic: boolean = false
  IconId: string = ""
  IsCalculated: boolean = false
  Status: number = 0
  ApprovalRequest: any
  PartialTimeFrom?: string
  PartialTimeTo?: string
  PartialTimeDuration: number = 0
  IsPartial: boolean = false
  OverrideHolidayAbsence: boolean = false
  IsModified: boolean = false
  ModifiedByUser: any
  ModifiedOn: any
}