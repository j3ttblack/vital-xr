import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { ConfirmuUserComponent } from './portal/confirm-user/confirm-user.component';
import { InviteUserComponent } from './portal/invite-user/invite-user.component';
import { ViewUsersComponent } from './portal/view-users/view-users.component';
import { AddOrganizationComponent } from './portal/VxrAdmin/addorganization/addorganization.component';
import { DeleteOrganizationComponent } from './portal/CompanyAdmin/deleteorganization/deleteorganization.component';
import { GetOrganizationComponent } from './portal/VxrAdmin/getorganizations/getorganization.component';
import { PortalComponent } from './portal/portal.component';
import { UpdateOrganizationComponent } from './portal/CompanyAdmin/updateorganization/updateorganization.component';
import { ProjectComponent } from './project/project.component';
import { SignupFormsComponent } from './signup/signup-forms/signup-forms.component';
import { SignupComponent } from './signup/signup.component';
import { DeleteOrganizationsComponent } from './portal/VxrAdmin/deleteorganizations/deleteorganizations.component';
import { UpdateOrganizationsComponent } from './portal/VxrAdmin/updateorganizations/updateorganization.scomponent';
import { UserProfileComponent } from './portal/user-profile/user-profile.component';
import { LoginCallback } from './login/callback/login-callback.component';

const routes: Routes = [
  // Home endpoints
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: LoginCallback },
  { path: 'signup', component: SignupComponent },

  // VxrAdmin Endpoints
  { path: 'organizations/approve', component: SignupFormsComponent },
  { path: 'organizations/add', component: AddOrganizationComponent },
  { path: 'organizations/delete', component: DeleteOrganizationsComponent },
  { path: 'organizations/get', component: GetOrganizationComponent },
  { path: 'organizations/update', component: UpdateOrganizationsComponent },

  // Company admin endpoints
  { path: 'organization/invite-user', component: InviteUserComponent },
  { path: 'organization/view', component: ViewUsersComponent },
  { path: 'organization/delete', component: DeleteOrganizationComponent },
  { path: 'organization/update', component: UpdateOrganizationComponent },

  // User change password
  { path: 'user/confirm', component: ConfirmuUserComponent },
  { path: 'user/profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
