import { Component } from '@angular/core';
import { API } from 'aws-amplify';

import { PortalService } from '../portal.service'

export interface Attribute {
  Name: string;
  Value: string;
}

@Component({
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss'],
  providers: [PortalService]
})
export class ViewUsersComponent {
  constructor(private portalService: PortalService) {
    this.data = [];
    this.columns = [
      'Email',
      'Enabled',
      'User Status',
      'Created At'
    ];

    const init = async () => {
      await this.getData();
      this.parseDataJson();
    }

    init();
  }

  dataJson: string;
  data: string[][];
  failed: string;
  columns: string[];

  onDelete(row: string[]) {
    
  }

  private async getData() {
    try {
      const res = await this.portalService.getAllUsers();
      this.failed = null;
      this.dataJson = res.data.body;
      console.log(this.dataJson);
    }
    catch (e) {
      this.failed = 'Failed to load resource. Please try again later.';
    }
  }

  private parseDataJson() {
    const data = JSON.parse(this.dataJson);
    console.log(data);
    data.forEach(row => {
      const r = []
      row['Attributes'].forEach(attr => {
        if (attr['Name'] != 'custom:org_id') r.push(attr['Value']);
      });
      r.push(row['Enabled'], row['UserStatus'], row['UserCreateDate']);
      this.data.push(r);
    });

    console.log(this.data);
  }
}