import React from 'react';
import IncomeGenerator from './IncomeGenerator.jsx';

var IncomeManager = (props) => {
  return (
    <div style={{'float':'left'}}>
      <ul>
        {props.generators.map((a, i) => <IncomeGenerator 
          key={i} 
          handlePurchase={props.handlePurchase} 
          handleLevelup={props.handleLevelup}
          generator={a}/>)}
      </ul>
    </div>
  )
};

export default IncomeManager;