import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Absence, AbsenceDefinition, User } from 'src/app/classes/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  private url = environment.proxyAHApiUrl;

  constructor(private http: HttpClient) { }

  public getAbsenceDefinitions(): Observable<AbsenceDefinition[]> {

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('ah_access_token') ?? '{}').access_token}`)
        .set("Content-Type", "application/json")
    };

    let url = `${this.url}/api/v1/AbsenceDefinitions`;

    return this.http
      .get<AbsenceDefinition[]>(url, headers);
    // .pipe(retry(0), catchError(this.obdelajNapako));
  }

  public getAbsences(parameters: any): Observable<Absence[]> {

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('ah_access_token') ?? '{}').access_token}`)
        .set("Content-Type", "application/json")
    };

    let url = `${this.url}/api/v1/Absences` +
      (parameters.startDate ? `?dateFrom=${parameters.startDate}` : '') +
      (parameters.endDate ? parameters.startDate ? `&dateTo=${parameters.endDate}` : `?dateTo=${parameters.endDate}` : '');


    console.log(url);

    return this.http
      .get<Absence[]>(url, headers);
    // .pipe(retry(0), catchError(this.obdelajNapako));
  }

  public addAbsence(absence: Absence): Observable<any> {

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('ah_access_token') ?? '{}').access_token}`)
        .set("Content-Type", "application/json")
    };

    let url = `${this.url}/api/v1/Absences`;


    return this.http.post<any>(url, absence, headers);
  }
}
