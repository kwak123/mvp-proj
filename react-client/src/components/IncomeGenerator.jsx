import React from 'react';

var IncomeGenerator = (props) => (
  <button onClick={() => props.handlePurchase(props.name)}>{props.name}</button>
);

export default IncomeGenerator;