export interface CurrencyData {
  base: string;
  date: string;
  historical: boolean;
  rates: { [key: string]: number };
  success: boolean;
  timestamp: number;
}
