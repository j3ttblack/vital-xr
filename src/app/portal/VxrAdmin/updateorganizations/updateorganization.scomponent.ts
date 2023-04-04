import { Component } from '@angular/core';
import { OrganizationService } from '../../organization.service';

@Component({
  templateUrl: './updateorganizations.component.html',
  styleUrls: ['./updateorganizations.component.scss'],
  providers: [OrganizationService]
})
export class UpdateOrganizationsComponent {
    columns: string[]
    
    o_data: Organization[];
    data: Organization[];

  constructor(private orgService: OrganizationService) {
    this.columns = [
      'Name',
      'Concurrent Users',
      'Max Users'
    ];
    this.orgService.getOrgs().subscribe(e => {
      this.o_data = JSON.parse(JSON.stringify(e))
      for(let i = 0; i < e.length; i++) {
        e[i] = e[i].slice(1, e[i].length-1)
      }
      this.data = e
    })

  }

  submit = false
  
  onSubmit() {
    this.submit = true
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i][0] != this.o_data[i][1]){
        this.orgService.updateOrg(this.o_data[i][0], 'name', this.data[i][0])
      }
      if (this.data[i][1] != this.o_data[i][2]) {
        this.orgService.updateOrg(this.o_data[i][0], 'concurrent_users', this.data[i][1])
      }
      if (this.data[i][2] != this.o_data[i][3]) {
        this.orgService.updateOrg(this.o_data[i][0], 'total_users', this.data[i][2])
      }
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
