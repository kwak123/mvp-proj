import React from 'react';
import PlayerInfo from './PlayerInfo.jsx';
import IncomeManager from './IncomeManager.jsx';

var Control = (props) => (
    <div>
      <PlayerInfo 
        player={props.player} 
        credits={props.credits} 
        starship={props.starship}
        starships={props.starships}
        handleShipPurchase={props.handleShipPurchase} 
        handleEnginePurchase={props.handleEnginePurchase} />
      <IncomeManager 
        handlePurchase={props.handlePurchase} 
        handleLevelup={props.handleLevelup}
        generators={props.generators} />
    </div>
);

export default Control;