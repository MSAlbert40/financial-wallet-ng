export interface ExpenseClass {
  reason: string;
  typeValue: string;
  value: number;
  typeExpense: TypeExpenseClass;
}

export interface TypeExpenseClass {
  id: number;
  name: string;
}

export interface ExpenseRequest {
  reason: string;
  typeValue: string;
  value: number;
}
