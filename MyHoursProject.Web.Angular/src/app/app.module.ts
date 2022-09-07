import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './services/auth-guard.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ProjectsGridComponent } from './components/users-grid/users-grid.component';
import { ResizableModule } from './components/resizable/resizable.module';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { LatestUpdatePipe } from './pipes/latest-update.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './components/user-modal/user-modal.component';
import { DiscardChangesModal} from './components/discard-changes-modal/discard-changes-modal.component';
import { WorkTypePipe } from './pipes/work-type.pipe';
import { CustomUriPipe } from './pipes/custom-uri.pipe';
import { RemainingTimePipe } from './pipes/remaining-time.pipe';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { AbsencesComponent } from './components/absences/absences.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '', component: SidebarComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'settings', component: SettingsComponent,
      },
      {
        path: 'users', component: UsersComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'absences', component: AbsencesComponent,
        canActivate: [AuthGuardService],
      },
    ]
  },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    UsersComponent,
    AbsencesComponent,
    DashboardComponent,
    SidebarComponent,
    ProjectsGridComponent,
    DynamicPipe,
    LatestUpdatePipe,
    NgbdModalContent,
    DiscardChangesModal,
    WorkTypePipe,
    CustomUriPipe,
    RemainingTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ResizableModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
