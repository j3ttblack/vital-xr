import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {
  router: Router
  addorgs_btnText: String
  deleteorg_btnText: String
  deleteorgs_btnText: String
  getorgs_btnText: String
  updateorgs_btnText: String
  approveorgs_btnText: String
  adduser_btnText: String
  viewuser_btnText: String
  viewinformation_btnText: String
  updateinformation_btnText: String
  vrresults_btnText: String
  userlevel = ''


  constructor(router: Router) {
    this.router = router
    this.userlevel = localStorage.getItem('accessLevel')
    // this.userlevel = 'OrgAdmin'
  }

  route(url: string){
    console.log('Routing to ' + url)
    this.router.navigateByUrl(url)
  }
}
