import {EnterpriseClass} from "./enterprise-class";
import {RateClass} from "./rate-class";

export interface WalletClass {
  id: number;
  currency: string;
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

