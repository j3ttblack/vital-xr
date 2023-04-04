import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from 'aws-amplify';

@Injectable()
export class SignupService {
  signupUrl = 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/dev/signup';

  constructor(private http:HttpClient) {}

  signup(org: string, fname: string, lname: string, email: string, usage: string) {
    const body = {
      org,
      fname,
      lname,
      email,
      usage
    };

    return this.http.post(this.signupUrl, body);
  }

  async getSignupForms() {
    const token = (await Auth.currentSession()).getIdToken().getJwtToken();
    return this.http.get(this.signupUrl, {headers: {Authorization: token}});
  }
}