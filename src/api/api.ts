import { CurrencyData } from '../types/CurrencyData';

const myHeaders = new Headers();
myHeaders.append('apikey', '4ASz2L1X9e3V49mRrwNY5fR60LoNp1wM');

const requestOptions = {
  method: 'GET',
  redirect: 'follow' as RequestRedirect,
  headers: myHeaders,
};

const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest';
const ENDPOINTS = {
  symbols: (symbolsValue: string) => `&symbols=${symbolsValue}`,
  base: (baseValue: string) => `?base=${baseValue}`,
};

export const getData = (fromCurrency = 'UAH', toCurrency = ''): Promise<CurrencyData> => {
  return fetch(
    `${BASE_URL}${ENDPOINTS.base(fromCurrency)}${ENDPOINTS.symbols(toCurrency)}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.warn('error', error));
};
