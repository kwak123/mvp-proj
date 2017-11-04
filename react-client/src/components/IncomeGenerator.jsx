import React from 'react';

var IncomeGenerator = (props) => (
  <li style={{'listStyleType': 'none'}}>
    <p>Count: {props.generator.count} Cost: {props.generator.cost} Level: {props.generator.level}</p>
    <p>Output: {props.generator.output}</p>
    <button onClick={() => props.handlePurchase(props.generator.name)}>{props.generator.name}</button>
    <button onClick={() => props.handleLevelup(props.generator.name)}>Level up</button>
  </li>
);

export default IncomeGenerator;