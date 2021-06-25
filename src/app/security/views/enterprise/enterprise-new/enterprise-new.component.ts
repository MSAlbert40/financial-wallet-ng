import { Component, OnInit } from '@angular/core';
import {EnterpriseService} from "../../../services/enterprise.service";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EconomicActivityClass} from "../../../interfaces/enterprise-class";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-enterprise-new',
  templateUrl: './enterprise-new.component.html',
  styleUrls: ['./enterprise-new.component.css']
})
export class EnterpriseNewComponent implements OnInit {

  managerId: string | null | undefined;
  economicActivityId: any;
  enterpriseForm: FormGroup;
  economicActivityList: EconomicActivityClass[] = [];

  constructor(private enterpriseService: EnterpriseService, private authService: AuthService, private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EnterpriseNewComponent>) {
    this.enterpriseForm = this.formBuilder.group({
      ruc: ['', [Validators.required, Validators.maxLength(11)]],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      address: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.managerId = this.authService.getUser();
    this.viewAllEconomicActivities();
  }

  viewAllEconomicActivities(): void {
    this.enterpriseService.listEconomicActivity().subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        this.economicActivityList = rest.data;
        console.log(this.economicActivityList);
      },
      complete: () => console.log('Complete')
    });
  }

  addEnterprise() {
    if (typeof this.managerId === "string") {
      this.enterpriseService.newEnterprise(this.enterpriseForm.getRawValue(), this.economicActivityId,
        parseInt(this.managerId)).subscribe({
        error: (err) => console.log(err),
        next: (res) => {
          console.log(res);
          console.log(this.enterpriseForm.getRawValue());
          this.dialogRef.close();
          window.location.href = '/Enterprise';
        },
        complete: () => console.log('Complete')
      });
    }
  }
}
