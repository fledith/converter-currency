import './CurrencyRow.scss';
import { ChangeEvent } from 'react';

interface Props {
  currencyOptions: string[];
  selectedCurrency: string;
  onChangedCurrency: (currencyOption: string) => void;
  onChangeAmount: (event: ChangeEvent<HTMLInputElement>) => void;
  amount: number;
}

export const CurrencyRow = (props: Props) => {
  const { currencyOptions, selectedCurrency, onChangedCurrency, amount, onChangeAmount } = props;

  const handleChangeCurrency = (event: ChangeEvent<HTMLSelectElement>) =>
    onChangedCurrency(event.target.value);

  return (
    <div className="row">
      <input type="number" className="input" value={amount} onChange={onChangeAmount} />
      <select className="select" value={selectedCurrency} onChange={handleChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
