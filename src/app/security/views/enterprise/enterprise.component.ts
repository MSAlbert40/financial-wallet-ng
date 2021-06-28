import { Component, OnInit } from '@angular/core';
import {EnterpriseService} from "../../services/enterprise.service";
import {AuthService} from "../../services/auth.service";
import {EnterpriseClass} from "../../interfaces/enterprise-class";
import {MatDialog} from "@angular/material/dialog";
import {EnterpriseNewComponent} from "./enterprise-new/enterprise-new.component";

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  managerId: string | null | undefined;
  enterpriseList: EnterpriseClass[] = [];

  constructor(private enterpriseService: EnterpriseService, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.managerId = this.authService.getUser();
    this.viewAllEnterprise();
  }

  viewAllEnterprise(): void {
    if (typeof this.managerId === "string") {
      this.enterpriseService.viewEnterprise(parseInt(this.managerId)).subscribe({
        error: (err) => console.log(err),
        next: (rest) => {
          this.enterpriseList = rest.data;
          console.log(this.enterpriseList);
        },
        complete: () => console.log('Complete')
      });
    }
  }

  newEnterprise(): void {
    this.dialog.open(EnterpriseNewComponent, {
      autoFocus: true
    });
  }
}
