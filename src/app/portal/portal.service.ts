import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Auth, API } from 'aws-amplify';

@Injectable()
export class PortalService {
  addOrgUrl = 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/combtest/organizations';
  inviteUserUrl = 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/dev/user';
  confirmUserUrl = 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/dev/user/confirm';
  newSignOnUrl = 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/dev/user/first-login';

  constructor(private http:HttpClient) {}

  addOrg(org: string, concurrent_users: number, total_users: number, is_deleted: Boolean) {
    let deleted = is_deleted ? 1 : 0
    const body = {
      'name': org,
      "concurrent_users": concurrent_users,
      "total_users": total_users,
      "isDeleted": deleted
    }

    const apiName = 'vxr-dev-ag';
    const path = '/organizations';
    const init = {
      response: true,
      body
    };
    // let header = new HttpHeaders();
    // header = header.append('content-type', 'application/json');
    // return this.http.post(this.URL , body, {headers : header});
    return API.put(apiName, path, init);
  }

  async inviteUser(email: string) {
    const api = 'vxr-dev-ag';
    const path = '/user';
    const init = {
      response: true,
      body: {
        email
      }
    };
    
    const res = await API.post(api, path, init);
  }

  async confirmUser(user: any, newPasswd: string) {
    return await Auth.completeNewPassword(user, newPasswd);
  }

  async signIn(email: string, passwd: string) {
    const user = await Auth.signIn(email, passwd);
    if (user != null) {
      let groups: any[] = user.signInUserSession.idToken.payload['cognito:groups']
      let usertype = 'NormalUser'
      if(groups.indexOf("VxrAdmin") !== -1) {
        usertype = 'VxrAdmin'
      } else if(groups.indexOf('CompanyAdmin') !== -1) {
        usertype = 'CompanyAdmin'
      }
      localStorage.setItem('accessLevel', usertype)
      localStorage.setItem('login', 'true');
    };
  }

  async getAllUsers() {
    const api = 'vxr-dev-ag';
    const path = '/user';
    const init = {
      response: true
    };

    return await API.get(api, path, init);
  }

  async editUserInfo(fname: string, lname: string, email: string) {
    const user = await Auth.currentAuthenticatedUser();
    // Auth.updateUserAttributes()
  }

  async getUserAttributes() {
    return await Auth.userAttributes(await Auth.currentAuthenticatedUser());
  }

  async updateUserAttributes(attrs: object) {
    if (Object.keys(attrs).length !== 0) 
      await Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), attrs);
  }

  async getOrgId(): Promise<string> {
    const attrs = await Auth.userAttributes(await Auth.currentAuthenticatedUser());
    const orgId = attrs.find(attr => {
      return attr.Name === 'custom:org_id';
    });

    return orgId.Value;
  }

  newSignOn(email: string) {
    return this.http.post(this.newSignOnUrl, {email});
  }

  async newSSO(email: string, username: string) {
    const api = 'vxr-dev-ag';
    const path = '/user/first-sso';
    const init = {
      response: true,
      body: {
        email,
        username
      }
    }

    const res = await API.post(api, path, init);
  }
}