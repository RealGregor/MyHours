import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  public sidenavExpanded: boolean = true;

  public get currentPage(): typeof CurrentPage {
    return CurrentPage;
  }

  ngOnInit(): void {
  }

  public assignActive(routesArr: string[] = this.router.url.split("/")): CurrentPage {
    switch (routesArr?.pop()) {
      case "":
        return CurrentPage.Settings
      case "settings":
        return CurrentPage.Settings
      case "users":
        return CurrentPage.Users
      case "absences":
        return CurrentPage.Absences
      case "undefined":
        return CurrentPage.Settings
      default:
        return this.assignActive(routesArr);
    }
  }

  public tokenValid(): boolean {
    let token = JSON.parse(localStorage.getItem('ah_access_token') ?? '{}');
    let valid = token.access_token && new Date(token.expirationTime) > new Date();
    if (!valid) {
      localStorage.removeItem('ah_access_token');
      // localStorage.clear();
      this.router.navigate(['/']);
    }
    return valid;
  }


  public logout() {
    localStorage.removeItem('ah_access_token');
    // localStorage.clear();
    this.router.navigate(['/']);
  }

}

enum CurrentPage {
  Settings,
  Users,
  Absences
}