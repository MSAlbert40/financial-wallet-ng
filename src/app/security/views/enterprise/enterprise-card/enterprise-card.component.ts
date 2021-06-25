import {Component, Input, OnInit} from '@angular/core';
import {EnterpriseClass} from "../../../interfaces/enterprise-class";
import {EnterpriseService} from "../../../services/enterprise.service";

@Component({
  selector: 'app-enterprise-card',
  templateUrl: './enterprise-card.component.html',
  styleUrls: ['./enterprise-card.component.css']
})
export class EnterpriseCardComponent implements OnInit {

  @Input() enterpriseCard: EnterpriseClass | null | undefined;

  constructor(private enterpriseService: EnterpriseService) { }

  ngOnInit(): void { }

  enterDashboard(): void {
    this.enterpriseService.setEnterprise(this.enterpriseCard?.id, this.enterpriseCard?.name);
    console.log(this.enterpriseCard);
    //window.location.href = '/Dashboard';
  }
}
