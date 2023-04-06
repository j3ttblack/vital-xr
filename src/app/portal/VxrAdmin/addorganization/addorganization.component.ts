import { Component } from '@angular/core';
import { OrganizationService } from '../../organization.service';

@Component({
  templateUrl: './addorganization.component.html',
  styleUrls: ['./addorganization.component.scss'],
  providers: [OrganizationService]
})
export class AddOrganizationComponent {
  constructor(private orgservice: OrganizationService ) {}
  orgname = "";
  concurrent_users = ''
  total_users = ''
  submit = false
  
  onSubmit() {
    this.orgservice.addOrg(this.orgname, Number(this.concurrent_users), Number(this.total_users), false)
      .then(e => {
        console.log(e);
      });
    this.submit = true
  }
}
