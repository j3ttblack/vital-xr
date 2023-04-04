import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { PortalService } from 'src/app/portal/portal.service';

@Component({
  templateUrl: './login-callback.component.html',
  providers: [PortalService]
})
export class LoginCallback implements OnInit {
  constructor(public route: Router, private portalService: PortalService) {}

  errMsg: string;

  ngOnInit(): void {
    const onInit = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const org_id = user.signInUserSession.idToken.payload['custom:org_id'];
        if (org_id == undefined) {
          const email = user.signInUserSession.idToken.payload['email'];
          const username = user.signInUserSession.idToken.payload['cognito:username'];

          await this.portalService.newSSO(email, username); 
        }
        localStorage.setItem('login', 'true');
        this.route.navigateByUrl('/portal');
      }
      catch (e) {
        if (e === 'The user is not authenticated') {
          this.errMsg = 'Unable to sign up. Please contact your administrator';
        }
        console.log(e);
      }
    }
    onInit();
  }
}