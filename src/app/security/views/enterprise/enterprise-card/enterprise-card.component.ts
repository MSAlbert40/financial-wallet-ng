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

  constructor(private enterprise: EnterpriseService) { }

  ngOnInit(): void { }

}
