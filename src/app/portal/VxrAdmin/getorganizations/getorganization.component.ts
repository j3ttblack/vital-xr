import { Component } from '@angular/core';
import { OrganizationService } from '../../organization.service';

@Component({
  templateUrl: './getorganization.component.html',
  styleUrls: ['./getorganization.component.scss'],
  providers: [OrganizationService]
})
export class GetOrganizationComponent {
  constructor(private orgService: OrganizationService) {
    this.data = [];
    this.columns = [
      'Name',
      'Concurrent Users',
      'Max Users',
      'Active'
    ];

    this.orgService.getOrgs().subscribe(e => {
      for(let i = 0; i < e.length; i++) {
        e[i] = e[i].slice(1, e[i].length)
        e[i][e[i].length-1] = e[i][e[i].length-1] == 0 ? '√' : ''
      }
      this.data = e
    })

  }

  data: Organization[];
  columns: string[];
}

export class Organization {
  id: number;
  name: string;
  concurrent_users: number;
  total_users: number;
  isDeleted: boolean;
}
