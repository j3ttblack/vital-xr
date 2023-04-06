import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Auth, API } from 'aws-amplify';

@Injectable()
export class OrganizationService {
  orgUrl = 'https://tdsy3cgt61.execute-api.ca-central-1.amazonaws.com/combtest/organizations';

  constructor(private http:HttpClient) {}

  setAllOrgs(org: string, concurrent_users: number, total_users: number, is_deleted: Boolean) {
    // don't need this endpoint


    // let deleted = is_deleted ? 1 : 0
    // const body = {
    //   'name': org,
    //   "concurrent_users": concurrent_users,
    //   "total_users": total_users,
    //   "isDeleted": deleted
    // }
    // console.log(JSON.stringify(body))
    // return this.http.put<any>(this.orgUrl,{body: JSON.stringify(body)})
  }

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
    console.log(JSON.stringify(body));

    return API.post(apiName, path, init);
  }

  getOrgs() {
    return API.get('vxr-dev-ag', '/organizations', {response: true});
  }

  updateOrgField(id, field, new_field) {
    // use the patch to update a single field, use the put to update the entire thing
  }

  deleteOrg(id) {
    const params = new HttpParams().set('id', id);  
    return API.del('vxr-dev-ag', '/organizations', {params: {id}, response: true});
  }

  getOrg(id) {
    console.log(id)
    const params = new HttpParams().set('id', id);
    return API.get('vxr-dev-ag', '/organizations', {params: {id}, response: true});
  }

  updateOrg(id, field, value) {
    const body = {
      'field': field,
      "value": value
    }
    const params = new HttpParams().set('id', id);  
    return API.patch('vxr-dev-ag', '/organizations', {params: {id}, response: true});
  }
}