import { cleanup } from '@testing-library/react';
import React from 'react';

export default function CurrencyRow({currArr, exchangeRates, tokenChange, inputChange}) {
  return (
    <div className="input-container">
      <input className="input" type="number" onChange={(e) => inputChange(exchangeRates.id, e.target.value)} value={exchangeRates.amount}/>
      <select className="select" onChange={(e) => tokenChange(exchangeRates.id, e.target.value)}>
        <option value='USD'>USD</option>
        {(cleanup) ? currArr.map((token, i) => <option key={i+1} value={token.symbol}>{token.symbol}</option>) : null}
      </select>
    </div>
  )
}