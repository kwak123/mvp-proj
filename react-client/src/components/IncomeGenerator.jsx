import React from 'react';

var IncomeGenerator = (props) => (
  <li>
    <p>{props.count}</p>
    <button onClick={() => props.handlePurchase(props.name)}>{props.name}</button>
    <button onClick={() => props.handleLevelup(props.name)}>Level up</button>
  </li>
);

export default IncomeGenerator;