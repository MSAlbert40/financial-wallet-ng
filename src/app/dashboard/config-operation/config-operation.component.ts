import { Component, OnInit } from '@angular/core';
import {WalletClass} from "../../security/interfaces/wallet-class";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../security/services/wallet.service";
import {RateService} from "../../security/services/rate.service";
import {ExpenseService} from "../../security/services/expense.service";
import {ExpenseClass} from "../../security/interfaces/expense-class";

interface PeriodTime {
  name: string;
  days: number;
}

@Component({
  selector: 'app-config-operation',
  templateUrl: './config-operation.component.html',
  styleUrls: ['./config-operation.component.css']
})

export class ConfigOperationComponent implements OnInit {

  walletId: number | undefined;
  walletDetail: WalletClass | undefined;
  walletList: WalletClass[] = [];

  rateForm: FormGroup;
  rateName: string | undefined;

  expenseForm: FormGroup;

  stepRate: boolean | undefined;
  stepExpense: boolean | undefined;

  expenseList: ExpenseClass[] = [];
  displayedColumns: string[] = ['typeExpense', 'reason', 'typeValue', 'value'];

  constructor(private walletService: WalletService, private rateService: RateService, private expenseService: ExpenseService, private formBuilder: FormBuilder) {
    this.rateForm = this.formBuilder.group({
      daysYear: [0, [Validators.required]],
      periodRate: 'null',
      daysRate: [0, [Validators.required]],
      valueRate: [0, [Validators.required]],
      periodCapitalization: 'null',
      daysCapitalization: [0, [Validators.required]],
      discountAt: ['YYYY-MM-DD', [Validators.required]]
    });

    this.expenseForm = this.formBuilder.group({
      reason: 'null',
      typeValue: 'null',
      value: [0.0, [Validators.required]]
    });
  }

  // Rate
  typeRate = [
    { name: 'Nominal', origin: 'RATE_NOMINAL' },
    { name: 'Effective', origin: 'RATE_EFFECTIVE' }
  ]

  yearDays: PeriodTime[] = [
    { name: 'Ordinary', days: 360 },
    { name: 'Extraordinary', days: 365 }
  ];

  periodRate: PeriodTime[] = [
    { name: 'Yearly', days: 360 },
    { name: 'Biyearly', days: 180 },
    { name: 'Quarterly', days: 120 },
    { name: 'Quarterly', days: 90 },
    { name: 'Bimonthly', days: 60 },
    { name: 'Monthly', days: 30 },
    { name: 'Biweekly', days: 15 },
    { name: 'Diary', days: 1 }
  ];

  periodCapitalization: PeriodTime[] = [
    { name: 'Yearly', days: 360 },
    { name: 'Biyearly', days: 180 },
    { name: 'Quarterly', days: 120 },
    { name: 'Quarterly', days: 90 },
    { name: 'Bimonthly', days: 60 },
    { name: 'Monthly', days: 30 },
    { name: 'Biweekly', days: 15 },
    { name: 'Diary', days: 1 }
  ];

  selectRate = this.typeRate[1].origin;
  selectYear = this.yearDays[0].days;
  selectPeriodRate = this.periodRate[0].days;
  selectPeriodCapitalization = this.periodCapitalization[0].days

  // Expenses
  typeExpense = [
    { name: 'Initial', origin: 'EXPENSE_INITIAL' },
    { name: 'Final', origin: 'EXPENSE_FINAL' }
  ];

  typeValue = [
    { name: 'Cash' },
    { name: 'Percentage' }
  ];

  typeIReason = [
    { name: 'Ports' },
    { name: 'Photocopies' },
    { name: 'Study commission' },
    { name: 'Disbursement commission' },
    { name: 'Intermediation commission' },
    { name: 'Administration expense' },
    { name: 'Notarial charges' },
    { name: 'Registry expenses' },
    { name: 'Insurance' },
    { name: 'Other Expenses' }
  ];

  typeFReason = [
    { name: 'Ports' },
    { name: 'Administration expense' },
    { name: 'Other Expenses' }
  ];

  selectExpense = this.typeExpense[0].origin;
  selectValue = this.typeValue[0].name;
  selectIReason = this.typeIReason[0].name;
  selectFReason = this.typeFReason[0].name;

  ngOnInit(): void {
    this.identifyWallets();
    this.stepRate = true;
    this.stepExpense = false;
  }

  identifyWallets(): void {
    this.walletService.allWallet().subscribe({
      error: (err) => console.log(err),
      next: (res) => {
        this.walletList = res.data;
        this.walletId = this.walletList.length;
        this.detailWallet(this.walletId);
        console.log(this.walletId);
      },
      complete: () => console.log('Complete')
    });
  }

  detailWallet(walletId: number): void {
    this.walletService.detailWallet(walletId).subscribe({
      error: (err) => console.log(err),
      next: (res) => {
        this.walletDetail = res.data;
        console.log(this.walletDetail);
      },
      complete: () => console.log('Complete')
    });
  }

  viewExpenses(): void {
    this.expenseService.listExpense(this.selectExpense, this.walletId).subscribe({
      error: (err) => console.log(err),
      next: (res) => {
        this.expenseList = res.data;
        console.log(res);
      },
      complete: () => console.log('complete')
    });
  }

  addRate(): void {
    this.rateForm.value.periodRate = this.identifyPeriod(this.selectPeriodRate);
    this.rateForm.value.periodCapitalization = this.identifyPeriod(this.selectPeriodCapitalization);
    this.rateService.newRate(this.rateForm.value, this.selectRate, this.walletId).subscribe({
      error: (err) => console.log(err),
      next: res => console.log(res),
      complete: () => {
        this.stepRate = false;
        this.stepExpense = true;
        console.log('complete')
      }
    });
  }

  addExpense(): void {
    this.expenseForm.value.typeValue = this.selectValue;
    this.expenseForm.value.reason = this.identifyReason(this.selectExpense);
    this.expenseService.newExpense(this.expenseForm.value, this.selectExpense, this.walletId).subscribe({
      error: (err) => console.log(err),
      next: (res) => {
        this.viewExpenses();
        console.log(res)
      },
      complete: () => console.log('complete')
    });
  }

  identifyReason(expense: string): string {
    switch (expense) {
      case 'EXPENSE_INITIAL': return this.selectIReason;
      case 'EXPENSE_FINAL': return this.selectFReason;
      default: return 'null';
    }
  }

  identifyPeriod(days: number): string {
    switch (days) {
      case 360: return 'Yearly';
      case 180: return 'Biyearly';
      case 120: return 'Quarterly';
      case 90: return 'Quarterly';
      case 60: return 'Bimonthly';
      case 30: return 'Monthly';
      case 15: return 'Biweekly';
      case 1: return 'Diary';
      default: return 'null';
    }
  }

  Save(): void {
    this.walletService.setDetailWallet(this.walletId);
    window.location.href = '/Operation';
  }
}

