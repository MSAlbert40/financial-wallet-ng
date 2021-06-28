import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./security/services/auth.service";
import {EnterpriseService} from "./security/services/enterprise.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financial-wallet-ng';

  active = true
  access = false
  enterprise: string | undefined | null;

  constructor(private enterpriseService: EnterpriseService, private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) { this.enterprise = this.enterpriseService.getEnterpriseName(); }
  }

  visibleOn() {
    this.active = this.router.url == '/Home';
    return this.active;
  }

  visibleOff() {
    if (this.router.url == '/Dashboard' || this.router.url == '/Operation' || this.router.url == '/Wallet')
    this.access = true;
    return this.access
  }

  LogOut() {
    this.authService.logOut();
    this.enterprise = ''
  }
}
