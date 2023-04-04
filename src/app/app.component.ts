import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Auth, Hub } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-site';
  router: Router;
  current_component: String;
  logged_in: Boolean = false
  unsub: () => void;

  constructor(router: Router) {
    this.router = router;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        this.current_component = e.url;
        this.logged_in = localStorage.getItem('login') == 'true'
      });
  }
  logout() {
    localStorage.setItem('login', 'false');
    Auth.signOut();
  }
}
