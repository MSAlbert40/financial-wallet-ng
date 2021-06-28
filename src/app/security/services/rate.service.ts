import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RateClass, RateRequest} from "../interfaces/rate-class";
import {Observable} from "rxjs";
import {MessageResponse} from "../interfaces/message-response";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private http: HttpClient) { }

    newRate(body: RateRequest, typeRate: string, wallet: number | undefined): Observable<MessageResponse<RateClass>> {
    let params = new HttpParams();
    params = params.set('typeRate', String(typeRate));
    params = params.set('wallet', String(wallet));
    return this.http.post<MessageResponse<RateClass>>(environment.apiURL + '/rate/add', body, {params});
  }

  detailRate(wallet: number | undefined): Observable<MessageResponse<RateClass>> {
    return this.http.get<MessageResponse<RateClass>>(environment.apiURL + '/rate/' + wallet);
  }
}
