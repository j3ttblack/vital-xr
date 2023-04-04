import { Component } from '@angular/core';
import { PortalService } from '../portal.service'

@Component({
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss'],
  providers: [PortalService]
})
export class ConfirmuUserComponent {
  constructor(private portalService: PortalService) {}
  email = '';
  prevPasswd = '';
  newPasswd = '';
  submit = false;
  
  onSubmit() {
    // this.portalService.confirmUser(this.email, this.prevPasswd, this.newPasswd);
    this.submit = true
  }
}
