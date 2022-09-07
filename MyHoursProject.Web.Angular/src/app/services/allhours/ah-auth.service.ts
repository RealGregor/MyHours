import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AHAuthService {

  private url = environment.proxyAHUrl;

  constructor(private http: HttpClient) { }

  public getToken(clientId: string, clientSecret: string): Observable<any> {

    const data = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'api'
    };

    const headers = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
    };

    console.log({ data, headers });

    return this.http
      .post<any>(`${this.url}connect/token`, data, headers);
    // .pipe(retry(1), catchError(this.obdelajNapako));
  }

}
