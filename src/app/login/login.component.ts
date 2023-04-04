import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { PortalService } from '../portal/portal.service';

export enum LoginResponse {
  SUCCESS,
  UNAUTHORIZED,
  FAILURE,
  NEW_PASSWORD_REQUIRED
}

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [PortalService]
})
export class LoginComponent {
  username: string = "";
  pswd: string = "";
  error_message: string = "";
  router: Router;
  btnText: String = "Submit";
  needConfirm: boolean;

  newPasswd = '';
  tempPasswd = '';
  submit = false;
  newLogin = false;
  user: any;

  constructor(private portalService: PortalService, router: Router) {
    this.router = router
  }

  onContinueWithGoogle() {
    const {oauth, userPoolWebClientId} = Auth.configure();
    const scopes = (<string[]>oauth.scope).join(' ');

    const url = `${oauth.domain}/oauth2/authorize?identity_provider=Google&redirect_uri=${oauth['redirectSignIn']}&response_type=TOKEN&client_id=${userPoolWebClientId}&scope=${scopes}`;

    window.location.href = url;
  }

  async checkCredentials(): Promise<LoginResponse> {
    try {
      this.user = await Auth.signIn(this.username, this.pswd);
      if (this.user.challengeName = 'NEW_PASSWORD_REQUIRED' && this.user.signInUserSession === null)
        return LoginResponse.NEW_PASSWORD_REQUIRED;

      return LoginResponse.SUCCESS;
    }
    catch (e) {
      if (e.name === 'NotAuthorizedException') return LoginResponse.UNAUTHORIZED;
      return LoginResponse.FAILURE;
    }
  }

  async onSubmit() {
    if (!this.isValidPasswd(this.newPasswd)) {
      this.error_message = "Password must be 8 characters, and include 1 uppercase, lowercase, and special character.";
      return;
    }
    try {
      const user = await Auth.signIn(this.username, this.tempPasswd);
      this.user = await this.portalService.confirmUser(user, this.newPasswd);
      this.onSignInSuccess('/portal');
      this.needConfirm = false;
    }
    catch (e) {
      console.log(e);
      console.log(Object.entries(e));
    }
  }

  onNewLogin() {
    this.newLogin = true;
  }

  onNewLoginSubmitted() {
    this.portalService.newSignOn(this.username).subscribe(e => {
      console.log(e);
      switch (e['body']) {
        case 'UserNameExistsException':
          this.error_message = 'Looks like your account already exists. Please try to sign in.';
          break;
        case 'Inernal Server Error':
          this.error_message = 'Server error. Please try again later';
          break;
        case 'Not Found':
          this.error_message = 'Looks like your account already exists or you didn\'t receive an invite from your administrator';
          break;
        default:
          if (e['statusCode'] === 200) {
            this.newLogin = false;
            this.needConfirm = true;
          }
      }
    });
  }

  onSignInSuccess(url: string) {
    Auth.currentAuthenticatedUser().then(u => console.log(u));
    let groups: string[] = this.user.signInUserSession.idToken.payload['cognito:groups'];

    let usertype = 'NonAdmin';
    if(groups.indexOf("VxrAdmin") !== -1) usertype = 'VxrAdmin';
    else if(groups.indexOf('OrgAdmin') !== -1) usertype = 'OrgAdmin';

    localStorage.setItem('accessLevel', usertype)
    localStorage.setItem('login', 'true');
    const orgId = this.portalService.getOrgId().then(id => console.log(id));
    // localStorage.setItem('org_id', this.user.attributes['custom:org_id']);

    this.reset();
    this.router.navigateByUrl(url);
  }

  reset() {
    this.error_message = '';
    this.username = '';
    this.pswd = '';
  }

  isValidPasswd(passwd: string): boolean {
    return (
      passwd.length >= 8 &&
      /\d/.test(passwd) &&
      /[\^$*.\[\]{}()?\-"!@#%&\/\\,><':;|_~`+=]/.test(passwd) &&
      /[a-z]/.test(passwd) &&
      /[A-Z]/.test(passwd)
    )
  }

  async login_navigation(): Promise<void> {
    switch (await this.checkCredentials()) {
      case LoginResponse.NEW_PASSWORD_REQUIRED:
        this.error_message = '';
        this.needConfirm = true;
        break;
      case LoginResponse.SUCCESS:
        this.onSignInSuccess('/portal');
        break;
      case LoginResponse.UNAUTHORIZED:
        this.pswd = "";
        this.error_message = "Invalid username or password."
        break;
      case LoginResponse.FAILURE:
        this.username = '';
        this.pswd = '';
        this.error_message = "Unable to Login. Please try again later.";
    }
  }
}
