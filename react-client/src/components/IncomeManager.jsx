import React from 'react';
import IncomeGenerator from './IncomeGenerator.jsx';

var IncomeManager = (props) => {
  let names = [];
  for (let key in props.generators) {
    let nameCount = [];
    names.push([props.generators[key].name, props.generators[key].count]);
  };

  return (
    <div style={{'float':'left'}}>
      <ul>
        {names.map((a, i) => <IncomeGenerator 
          key={i} 
          handlePurchase={props.handlePurchase} 
          handleLevelup={props.handleLevelup}
          name={a[0]} 
          count={a[1]}/>)}
      </ul>
    </div>
  )
};

export default IncomeManager;