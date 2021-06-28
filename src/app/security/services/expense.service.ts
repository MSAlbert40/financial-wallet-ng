import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageResponse} from "../interfaces/message-response";
import {ExpenseClass, ExpenseRequest} from "../interfaces/expense-class";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

    newExpense(body: ExpenseRequest, typeExpense: string, wallet: number | undefined): Observable<MessageResponse<ExpenseClass>> {
    let params = new HttpParams();
    params = params.set('typeExpense', String(typeExpense));
    params = params.set('walletId', String(wallet));
    return this.http.post<MessageResponse<ExpenseClass>>(environment.apiURL + '/expense/add', body, {params});
  }

  listExpense(typeExpense: string, wallet: number | undefined): Observable<MessageResponse<ExpenseClass[]>> {
    let params = new HttpParams();
    params = params.set('typeExpense', String(typeExpense));
    params = params.set('walletId', String(wallet));
    return this.http.get<MessageResponse<ExpenseClass[]>>(environment.apiURL + '/expense/', {params});
  }
}
