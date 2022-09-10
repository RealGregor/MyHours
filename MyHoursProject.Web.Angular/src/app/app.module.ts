import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService } from './services/auth-guard.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ResizableModule } from './components/resizable/resizable.module';
import { DynamicPipe } from './pipes/dynamic.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiscardChangesModal} from './components/discard-changes-modal/discard-changes-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';
import { AbsencesComponent } from './components/absences/absences.component';
import { UsersGridComponent } from './components/users-grid/users-grid.component';
import { AddUserAbsenceModalContent } from './components/user-add-absence-modal/user-add-absence-modal.component';
import { AddUserModalContent } from './components/user-add-modal/user-add-modal.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { AbsencesGridComponent } from './components/absences-grid/absences-grid.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  {
    path: '', component: SidebarComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'settings'
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
    SettingsComponent,
    UsersComponent,
    UsersGridComponent,
    AbsencesComponent,
    AbsencesGridComponent,
    SidebarComponent,
    DynamicPipe,
    AddUserModalContent,
    AddUserAbsenceModalContent,
    DiscardChangesModal,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ResizableModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    CookieService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
