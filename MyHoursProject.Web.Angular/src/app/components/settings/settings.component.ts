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
      res.expirationTime = new Date(new Date().getTime() + res.expires_in * 1000);//expires_in in minutes or seconds?
      localStorage.setItem("ah_access_token", JSON.stringify(res));
    });

  }
}
