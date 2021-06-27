export interface RateClass {
  id: number;
  daysYear: number;
  periodRate: string;
  daysRate: number;
  valueRate: number;
  periodCapitalization: string;
  daysCapitalization: number;
  discountAt: string;
  typeRate: TypeRateClass;
}

export interface TypeRateClass {
  id: number;
  name: string;
}

export interface RateRequest {
  daysYear: number;
  periodRate: string;
  daysRate: number;
  valueRate: number;
  periodCapitalization: string;
  daysCapitalization: number;
  discountAt: string;
}
