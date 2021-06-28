import { Component, OnInit } from '@angular/core';
import {AuthService} from "../security/services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EnterpriseService} from "../security/services/enterprise.service";
import {WalletService} from "../security/services/wallet.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nameUser: string | null | undefined;
  enterpriseId: string | null | undefined;
  walletForm: FormGroup;

  constructor(private walletService: WalletService, private authService: AuthService, private enterpriseService: EnterpriseService, private formBuilder: FormBuilder) {
    this.walletForm = this.formBuilder.group({
      currency: 'Dollars'
    });
  }

  ngOnInit(): void {
    this.nameUser = this.authService.getNameUser();
    this.enterpriseId = this.enterpriseService.getEnterpriseId();
  }

  newOperation(): void {
    if (typeof this.enterpriseId === "string") {
      this.walletService.addWallet(this.walletForm.getRawValue(), parseInt(this.enterpriseId)).subscribe({
        error: (err) => console.log(err),
        next: (res) => {
          console.log(res.data);
          //window.location.href = '/Operation';
        },
        complete: () => console.log('Complete')
      });
    }
  }

  viewAllOperation(names: string): void {
    this.walletService.setWallet(names);
    console.log(names);
    window.location.href = '/Wallet';
  }
}
