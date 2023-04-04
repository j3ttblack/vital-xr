import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../organization.service';

@Component({
  templateUrl: './deleteorganizations.component.html',
  styleUrls: ['./deleteorganizations.component.scss'],
  providers: [OrganizationService]
})
export class DeleteOrganizationsComponent {
  btnText = ''
  data: Organization[];
  columns: string[];
  data_unfiltered: Organization[];
  
  constructor(private orgService: OrganizationService, private router: Router) {
    this.data = [];
    this.columns = [
      'Name',
      'Concurrent Users',
      'Max Users',
      'Active'
    ];

    this.orgService.getOrgs().subscribe(e => {
      this.data_unfiltered = JSON.parse(JSON.stringify(e))
      for(let i = 0; i < e.length; i++) {
        e[i] = e[i].slice(1, e[i].length)
        e[i][e[i].length-1] = e[i][e[i].length-1] == 0 ? '√' : ''
      }
      this.data = e
    })

  }

  delete(row) {
    this.orgService.deleteOrg(this.data_unfiltered[row][0]).subscribe(e => {console.log(e)})
    this.router.navigateByUrl("/portal")
  }
}

export class Organization {
  id: number;
  name: string;
  concurrent_users: number;
  total_users: number;
  isDeleted: boolean;
}

