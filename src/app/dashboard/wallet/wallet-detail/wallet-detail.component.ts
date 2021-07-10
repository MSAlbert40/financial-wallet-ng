import { Component, OnInit } from '@angular/core';
import {RateClass} from "../../../security/interfaces/rate-class";
import {WalletClass} from "../../../security/interfaces/wallet-class";
import {DiscountClass} from "../../../security/interfaces/discount-class";
import {WalletService} from "../../../security/services/wallet.service";
import {RateService} from "../../../security/services/rate.service";

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  rateName: string | undefined;
  rateDetail: RateClass | undefined;

  walletDetail: WalletClass | undefined;
  walletId: string | undefined;

  discountList: DiscountClass[] = [];
  displayedColumns: string[] = ['documentName', 'initialAt', 'valueNominal', 'expirationAt', 'daysPeriod', 'retention', 'rateEffective', 'rateDiscount', 'valueDiscount',
    'expenseInitial', 'expenseFinal', 'valueNet', 'valueReceived', 'valueDelivered', 'TCEA'];

  constructor(private walletService: WalletService, private rateService: RateService) { }

  ngOnInit(): void {
    this.walletId = this.walletService.getDetailWallet();
    this.detailWallet();
    this.detailRate();
    this.viewDiscount();
  }

  detailRate(): void {
    if (typeof this.walletId === "string") {
      this.rateService.detailRate(parseInt(this.walletId)).subscribe({
        error: (err) => console.log(err),
        next: (res) => {
          this.rateDetail = res.data;
          console.log(this.rateDetail);
          this.identifyTypeRate(this.rateDetail.typeRate.name);
        },
        complete: () => console.log('Complete')
      })
    }
  }

  detailWallet(): void {
    if (typeof this.walletId === "string") {
      this.walletService.detailWallet(parseInt(this.walletId)).subscribe({
        error: (err) => console.log(err),
        next: (res) => {
          this.walletDetail = res.data;
          console.log(this.walletDetail);
        },
        complete: () => console.log('Complete')
      });
    }
  }

  viewDiscount(): void {
    if (typeof this.walletId === "string") {
      this.walletService.listDiscount(parseInt(this.walletId)).subscribe({
        error: (err) => console.log(err),
        next: (rest) => {
          this.discountList = rest.data;
          console.log(rest);
        },
        complete: () => console.log('Complete')
      });
    }
  }

  identifyTypeRate(name: string): void {
    switch (name) {
      case 'RATE_NOMINAL': this.rateName = 'Nominal'; break;
      case 'RATE_EFFECTIVE': this.rateName = 'Effective'; break;
      default: console.log('Sorry not found');
    }
  }
}
