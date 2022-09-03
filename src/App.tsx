import './App.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { CurrencyRow } from './components/CurrencyRow';
import { getData } from './api';

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [exchangeRateUSD, setExchangeRateUSD] = useState(1);
  const [exchangeRateEUR, setExchangeRateEUR] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let fromAmount: number;
  let toAmount: number;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = Math.trunc(amount * exchangeRate * 100) / 100;
  } else {
    toAmount = amount;
    fromAmount = Math.trunc((amount / exchangeRate) * 100) / 100;
  }

  useEffect(() => {
    getData().then((data) => {
      const firstCurrency =
        Object.keys(data.rates).find((rate) => rate === 'USD') || Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
      setExchangeRateUSD(data.rates.USD);
      setExchangeRateEUR(data.rates.EUR);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      getData(fromCurrency, toCurrency).then((data) => {
        setExchangeRate(data.rates[toCurrency]);
      });
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <div className="App">
      <div className="panel">
        <header className="panel-heading">
          <p className="default-currency">{`1 USD = ${
            Math.floor(100 / exchangeRateUSD) / 100
          } UAH`}</p>
          <p className="default-currency">{`1 EUR = ${
            Math.floor(100 / exchangeRateEUR) / 100
          } UAH`}</p>
        </header>
        <main className="App__main panel-block">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangedCurrency={setFromCurrency}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
          <span>=</span>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangedCurrency={setToCurrency}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
