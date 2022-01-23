import React from 'react';
import { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';

function Header() {
  return (
    <div className="header-container">
      <h2 className="header-title">Welcome to Crypto Converter</h2>
    </div>
  )
};

function Body() {

  let [currArr, setArr] = useState([]);
  let [lastChangedInput,setLastChangeInput] = useState();

  let [exchangeRates, setExRates ] = useState([
    {id: 0, rate: 1, symbol: 'USD', amount: ''},
    {id: 1, rate: 1, symbol: 'USD', amount: ''}
  ]);

  useEffect(() => {
    let cleanup = false;
    (async function Request() {
      let response = await fetch('https://crypto-kek.herokuapp.com/', {
        headers: {
          Accept: 'application/json',
        }
      });
      let result = await response.json();
      setArr(result);
    })();
    return () => cleanup = true;
  },[]);

  function tokenChange(id,value) {
    setExRates( exchangeRates => {
      let newRates = Object.assign({}, exchangeRates);
      newRates[id].symbol = value;
      if(value === 'USD') {
        newRates[id].rate = 1;
      } else {
        let actualToken = currArr.filter(token => token.symbol === value)[0];
        newRates[id].rate =  actualToken.quote.USD.price;
      }
      amountChange(lastChangedInput, exchangeRates[lastChangedInput].amount)
      return newRates;
    });
  }

  function amountChange(id, value) {
    let currency = exchangeRates[id].rate / exchangeRates[Math.abs(id - 1)].rate
    setExRates( 
      (exchangeRates) => {
      let newRates = Object.assign({}, exchangeRates);
        newRates[id].amount = value;
        newRates[Math.abs(id - 1)].amount = value ? currency * +value : '';
      return newRates;
    }
    );
    setLastChangeInput(id);
  }

  return (
    <div className='converter-body'>
      <CurrencyRow exchangeRates ={exchangeRates[0]} currArr={currArr} tokenChange={tokenChange} inputChange={amountChange} />
      <br/>
      <CurrencyRow exchangeRates={exchangeRates[1]} currArr={currArr} tokenChange={tokenChange} inputChange={amountChange} />
    </div>
  )
}

function App() {
  return (
    <div className="container">
      <Header/>
      <Body/>
    </div>
  );
}

export default App;
