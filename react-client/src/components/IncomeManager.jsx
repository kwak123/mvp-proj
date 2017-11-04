import React from 'react';
import IncomeGenerator from './IncomeGenerator.jsx';

var IncomeManager = (props) => {
  let style = {
    'float': 'left',
    'border': 'solid #000 1px',
    'margin': '0 0 0 8px'
  }

  let ulStyle = {
    'padding': '0 8px 0 8px',
  }

  return (
    <div style={style}>
      <ul style={ulStyle}>
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