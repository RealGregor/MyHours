import { Component, Input, OnInit } from '@angular/core';
import { AHAuthService } from 'src/app/services/allhours/ah-auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public clientId: string | null = localStorage.getItem('clientId');
  public clientSecret: string | null = localStorage.getItem('clientSecret');

  public tokenValid(): boolean {
    let token = JSON.parse(localStorage.getItem('ah_access_token') ?? '{}');
    return token.access_token && new Date(token.expirationTime) > new Date();
  }

  constructor(private authService: AHAuthService) { }

  ngOnInit(): void {
  }

  public getToken() {
    if (!this.clientId || !this.clientSecret) return;

    this.authService.getToken(this.clientId, this.clientSecret).subscribe((res) => {
      var date = new Date();
      res.expirationTime = new Date(new Date() );//expires_in in secs?
      date.setTime(res.expires_in * 1000 + date.getTime());
      res.expirationTime = date;
      localStorage.setItem("ah_access_token", JSON.stringify(res));
    });

  }
}
