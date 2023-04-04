import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Auth, Amplify } from 'aws-amplify';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent {
  constructor(private signupService: SignupService ) {}
  
  company = '';
  fname = '';
  lname = '';
  email = '';
  reason = '';
  submit = false;
  
  onSubmit() {
    this.signupService.signup(this.company, this.fname, this.lname, this.email, this.reason)
      .subscribe(e => {
        console.log(e);
      });
    this.submit = true
  }
}
