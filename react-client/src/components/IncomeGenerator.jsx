import React from 'react';

var IncomeGenerator = (props) => (
  <li style={{'listStyleType': 'none'}}>
    <p style={{'margin': '4px 2px'}}>Count: {props.generator.count} - Cost: {props.generator.cost} - Level: {props.generator.level}</p>
    <p style={{'margin': '4px 2px'}}>Output: {props.generator.output}</p>
    <button onClick={() => props.handlePurchase(props.generator.name)}>{props.generator.name}</button>
    <button style={{'marginBottom': 12}}onClick={() => props.handleLevelup(props.generator.name)}>Level up</button>
  </li>
);

export default IncomeGenerator;