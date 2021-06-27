import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {WalletClass, WalletRequest} from "../interfaces/wallet-class";
import {Observable} from "rxjs";
import {MessageResponse} from "../interfaces/message-response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  addWallet(body: WalletRequest, enterprise: number): Observable<MessageResponse<WalletClass>> {
    let params = new HttpParams();
    params = params.set('enterpriseId', String(enterprise));
    return this.http.post<MessageResponse<WalletClass>>(environment.apiURL + '/wallet/add', body, {params});
  }

  allWallet(): Observable<MessageResponse<WalletClass[]>> {
    return this.http.get<MessageResponse<WalletClass[]>>(environment.apiURL + '/wallet/all');
  }

  setDetailWallet(id: number | undefined): void {
    localStorage.setItem('walletID', String(id));

  }

  setWallet(name: string | undefined): void {
    localStorage.setItem('walletName', String(name));
  }

  getDetailWallet(): string { return <string>localStorage.getItem('walletID'); }

  getWallet(): string { return <string>localStorage.getItem('walletName'); }
}
