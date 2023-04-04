import { Component } from '@angular/core';
import { PortalService } from '../portal.service'

@Component({
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss'],
  providers: [PortalService]
})
export class InviteUserComponent {
  constructor(private portalService: PortalService ) {}
  email = '';
  submit = false;
  
  onSubmit() {
    this.portalService.inviteUser(this.email);
    this.submit = true
  }
}
