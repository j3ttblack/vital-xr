import { Component } from '@angular/core';
import { OrganizationService } from '../../organization.service';

@Component({
  templateUrl: './updateorganization.component.html',
  styleUrls: ['./updateorganization.component.scss'],
  providers: [OrganizationService]
})
export class UpdateOrganizationComponent {
    columns: string[]
    
  constructor(private orgService: OrganizationService) {
    this.columns = [
      'Name',
      'Concurrent Users',
      'Max Users'
    ];
    this.o_org_id = Number(localStorage.getItem('org_id'))
    this.orgService.getOrg(60).then(e => {
      e = e.data;
      this.o_orgname = this.orgname = e[0][1]
      this.o_concurrent_users = this.concurrent_users = e[0][2]
      this.o_total_users = this.total_users = e[0][3]
    })

  }
  o_orgname = "";
  o_concurrent_users = ''
  o_total_users = ''
  o_org_id = 0

  orgname = "";
  concurrent_users = ''
  total_users = ''
  submit = false
  
  onSubmit() {
    this.submit = true
    if (this.o_orgname !== this.orgname) {
      this.orgService.updateOrg(this.o_org_id, 'name', this.orgname)
    }
    if (this.o_concurrent_users !== this.concurrent_users) {
      this.orgService.updateOrg(this.o_org_id, 'concurrent_users', this.concurrent_users)
    }
    if (this.o_total_users !== this.total_users) {
      this.orgService.updateOrg(this.o_org_id, 'total_users', this.total_users)
    }
  }
}

export class Organization {
  id: number;
  name: string;
  concurrent_users: number;
  total_users: number;
  isDeleted: boolean;
}
