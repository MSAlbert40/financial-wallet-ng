import { Component, OnInit } from '@angular/core';
import {DiscountClass} from "../../security/interfaces/discount-class";
import {WalletService} from "../../security/services/wallet.service";
import {WalletClass} from "../../security/interfaces/wallet-class";
import {RateService} from "../../security/services/rate.service";
import {RateClass} from "../../security/interfaces/rate-class";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  documentName: string | undefined;
  discountForm: FormGroup;

  rateName: string | undefined;
  rateDetail: RateClass | undefined;

  walletDetail: WalletClass | undefined;
  walletId: string | undefined;

  discountList: DiscountClass[] = [];
  displayedColumns: string[] = ['documentName', 'initialAt', 'valueNominal', 'expirationAt', 'daysPeriod', 'retention', 'rateEffective', 'rateDiscount', 'valueDiscount',
    'expenseInitial', 'expenseFinal', 'valueNet', 'valueReceived', 'valueDelivered', 'TCEA'];

  constructor(private walletService: WalletService, private rateService: RateService, private formBuilder: FormBuilder) {
    this.discountForm = this.formBuilder.group({
      documentName: 'null',
      initialAt: ['YYYY-MM-DD', [Validators.required]],
      expirationAt: ['YYYY-MM-DD', [Validators.required]],
      valueNominal: [0, [Validators.required]],
      retention: [0, [Validators.required]]
    });
  }

  typeDocument = [
    { name: 'Letter' },
    { name: 'Bill' },
    { name: 'Receipt of Honorary' }
  ];

  selectDocument = this.typeDocument[0].name;

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

  addDiscount(): void {
    if (typeof this.walletId === "string") {
      this.discountForm.value.documentName = this.selectDocument;
      this.walletService.addDiscount(this.discountForm.value, parseInt(this.walletId)).subscribe({
        error: (err) => console.log(err),
        next: (rest) => {
          console.log(rest);
          this.viewDiscount();
          this.detailWallet();
        },
        complete: () => console.log('Complete')
      });
    }
  }

  viewDiscount(): void {
    if (typeof this.walletId === "string") {
      this.discountForm.value.documentName = this.selectDocument;
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

  saveWallet() {
    window.location.href = '/Dashboard';
  }
}
