import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from '../../organization.service';

@Component({
  templateUrl: './deleteorganization.component.html',
  styleUrls: ['./deleteorganization.component.scss'],
  providers: [OrganizationService]
})
export class DeleteOrganizationComponent {
  constructor(private orgservice: OrganizationService, private router: Router) {}
  btnText = ''
  delete() {
    let org_id = Number(localStorage.getItem('org_id'))
    this.orgservice.deleteOrg(org_id)
    this.router.navigateByUrl("/home")
  }
}
