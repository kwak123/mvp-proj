import React from 'react';

var IncomeGenerator = (props) => (
  <li>
    <p>{props.count}</p>
    <button onClick={() => props.handlePurchase(props.name)}>{props.name}</button>
  </li>
);

export default IncomeGenerator;