import { Component, OnInit } from '@angular/core';
import {WalletService} from "../../security/services/wallet.service";
import {EnterpriseService} from "../../security/services/enterprise.service";
import {WalletClass} from "../../security/interfaces/wallet-class";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  walletName: string | undefined;
  walletLabel: string | undefined;
  enterpriseId: string | null | undefined;
  walletList: WalletClass[] = [];

  constructor(private walletService: WalletService, private enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.enterpriseId = this.enterpriseService.getEnterpriseId();
    this.identifyWallet(this.walletService.getWallet());
    this.viewWallets();
  }

  viewWallets(): void {
    if (typeof this.enterpriseId === "string") {
      this.walletService.listWallet(this.walletService.getWallet(), parseInt(this.enterpriseId)).subscribe({
        error: (err) => console.log(err),
        next: (res) => {
          this.walletList = res.data;
          console.log(this.walletList);
        },
        complete: () => console.log('Complete')
      });
    }
  }

  identifyWallet(name: string): void {
    switch (name) {
      case 'WALLET_LETTERS':
        this.walletName = 'Wallet of Letters';
        this.walletLabel = 'Letters'
      break;
      case 'WALLET_BILLS':
        this.walletName = 'Wallet of Bills';
        this.walletLabel = 'Bills'
        break;
      case 'WALLET_RECEIPTS_OF_HONORARY':
        this.walletName = 'Wallet of Receipts of Honorary';
        this.walletLabel = 'Receipts of Honorary'
        break;
      case 'WALLET_MIXED':
        this.walletName = 'Wallet Mixed';
        this.walletLabel = 'Mixed'
        break;
      default: console.log('Sorry not found');
    }
  }
}
