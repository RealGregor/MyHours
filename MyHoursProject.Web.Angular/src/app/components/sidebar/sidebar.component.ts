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

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.userService.getAccountDetails()
      .subscribe((data : Person) => {
        this.user = data;
      })
  }

  public logout(){
    this.cookieService.delete('tw_access_token');
    this.cookieService.delete('columns');
    this.cookieService.delete('projectParameters');
    this.router.navigate(['/']);
  }

}
