import {EnterpriseClass} from "./enterprise-class";

export interface WalletClass {
  id: number;
  currency: string;
  daysTotalPeriod: number;
  valueTotalReceived: number;
  valueTCEA: number;
  typeWallet: TypeWalletClass;
  enterprise: EnterpriseClass;
}

export interface TypeWalletClass {
  id: number;
  name: string;
}

export interface WalletRequest {
  currency: string;
}

