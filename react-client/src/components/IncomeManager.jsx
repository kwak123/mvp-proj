import React from 'react';
import IncomeGenerator from './IncomeGenerator.jsx';

var IncomeManager = (props) => (
    <div>
      <ul>
        {props.names.map((a, i) => <IncomeGenerator key={i} handlePurchase={props.handlePurchase} name={a} />)}
      </ul>
    </div>
);

export default IncomeManager;