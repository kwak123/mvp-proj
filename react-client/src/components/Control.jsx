import React from 'react';
import PlayerInfo from './PlayerInfo.jsx';
import IncomeManager from './IncomeManager.jsx';

var Control = (props) => (
    <div>
      <PlayerInfo player={props.player} credits={props.credits}/>
      <IncomeManager handlePurchase={props.handlePurchase} generators={props.generators}/>
    </div>
);

export default Control;