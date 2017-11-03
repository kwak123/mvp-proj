import React from 'react';
import PlayerInfo from './PlayerInfo.jsx';
import IncomeManager from './IncomeManager.jsx';

var Control = (props) => (
  <div>
    <PlayerInfo player={props.player} credits={props.credits}/>
    <IncomeManager handlePurchase={props.handlePurchase} names={props.names}/>
  </div>
);

export default Control;