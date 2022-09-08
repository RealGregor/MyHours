import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/classes/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.proxyAHApiUrl;

  constructor(private http: HttpClient) { }

  // parameters?: ProjectParameters
  public getUsers(): Observable<User[]> {

    const headers = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('ah_access_token') ?? '{}').access_token}`)
        .set("Content-Type", "application/json")
    };

    let url = `${this.url}/api/v1/Users`;

    return this.http
      .get<User[]>(url, headers);
    // .pipe(retry(0), catchError(this.obdelajNapako));
  }
}
