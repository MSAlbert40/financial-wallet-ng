import {IAuthResponse} from './auth-user';

export interface EnterpriseClass {
  id: number;
  ruc: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  manager: IAuthResponse;
  economicActivity: EconomicActivityClass;
}

export interface EconomicActivityClass {
  id: number;
  name: string;
}

export interface EnterpriseRequest {
  ruc: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
