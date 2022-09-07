import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AccountDetails, Person } from 'src/app/classes/account-details';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  @Input()
  user: Person = UserService.user;

  public sidenavExpanded: boolean = true;

  public get currentPage(): typeof CurrentPage {
    return CurrentPage;
  }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.userService.getAccountDetails()
      .subscribe((data : Person) => {
        this.user = data;
      })
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

  

  public logout(){
    this.cookieService.delete('tw_access_token');
    this.cookieService.delete('columns');
    this.cookieService.delete('projectParameters');
    this.router.navigate(['/']);
  }

}

enum CurrentPage {
  Settings,
  Users,
  Absences,
  Povprasevanje,
  Proizvajalci,
  Izvajalci
}