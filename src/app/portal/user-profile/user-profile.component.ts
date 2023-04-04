import { Component, OnInit } from '@angular/core';
import { PortalService } from '../portal.service';
import { Auth } from 'aws-amplify';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [PortalService]
})
export class UserProfileComponent implements OnInit {
  constructor(private portalService: PortalService ) {}
  email = '';
  fname = '';
  lname = '';
  attributes: string[] = [];
  submit = false;

  ngOnInit() {
    this.portalService.getUserAttributes()
      .then(attrs => {
        console.log(attrs);
        attrs.forEach(attr => {
          if (attr.Name === 'email') this.email = attr.Value;
          if (attr.Name === 'given_name') {
            this.fname = attr.Value;
            this.attributes.push(attr.Value);
          }
          if (attr.Name === 'family_name') {
            this.lname = attr.Value;
            this.attributes.push(attr.Value);
          }
        });
      });
  }
  
  onSubmit() {
    const update: object = {};
    if (this.fname !== this.attributes[0]) update['given_name'] = this.fname;
    if (this.lname !== this.attributes[1]) update['family_name'] = this.lname;

    this.portalService.updateUserAttributes(update);
    this.submit = true
  }
}
