import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageResponse} from "../interfaces/message-response";
import {EconomicActivityClass, EnterpriseClass, EnterpriseRequest} from "../interfaces/enterprise-class";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private http: HttpClient) { }

  viewEnterprise(manager: number): Observable<MessageResponse<EnterpriseClass[]>> {
    let params = new HttpParams();
    params = params.set('managerId', String(manager));
    return this.http.get<MessageResponse<EnterpriseClass[]>>(environment.apiURL + '/enterprise/', {params});
  }

  listEconomicActivity(): Observable<MessageResponse<EconomicActivityClass[]>> {
    return this.http.get<MessageResponse<EconomicActivityClass[]>>(environment.apiURL + '/economicActivity/');
  }

    newEnterprise(body: EnterpriseRequest, economicActivity: number | undefined, manager: number): Observable<MessageResponse<EnterpriseClass>> {
    let params = new HttpParams();
    params = params.set('economicActivityId', String(economicActivity));
    params = params.set('managerId', String(manager));
    return this.http.post<MessageResponse<EnterpriseClass>>(environment.apiURL + '/enterprise/add', body, {params});
  }

    setEnterprise(id: number | undefined, name: string | undefined): void {
    localStorage.setItem('enterpriseID', String(id));
    localStorage.setItem('enterpriseName', String(name));
  }

  getEnterpriseId() { return localStorage.getItem('enterpriseID'); }

  getEnterpriseName(): string { return <string>localStorage.getItem('enterpriseName'); }
}
