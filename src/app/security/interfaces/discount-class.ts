export interface DiscountClass {
  id: number;
  documentName: string;
  initialAt: string;
  expirationAt: string;
  valueNominal: number;
  retention: number;
  daysPeriod: number;
  rateEffective: number;
  rateDiscount: number;
  valueDiscount: number;
  expenseInitial: number;
  expenseFinal: number;
  valueNet: number;
  valueReceived: number;
  valueDelivered: number;
  tcea: number;
}

export interface DiscountRequest {
  documentName: string;
  initialAt: string;
  expirationAt: string;
  valueNominal: number;
  retention: number;
}
