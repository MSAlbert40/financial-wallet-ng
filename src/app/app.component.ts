import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financial-wallet-ng';

  active = true
  enterprise: any;

  constructor(private router: Router) { }

  visibleOn() {
    this.active = this.router.url == '/Home';
    return this.active;
  }
}
