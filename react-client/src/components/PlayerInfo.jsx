import React from 'react';

var PlayerInfo = (props) => {

  let handleChange = (e) => {
    props.handleShipPurchase(e.target.value);
  }

  return (
    <div style={{'float':'left'}}>
      <ul>
        <li>Name: {props.player.username}</li>
        <li>Species: {props.player.species}</li>
        <li>Credits: {props.credits}</li>
        <li>Starship: {props.starship.name}</li>
        <li>Speed: {props.starship.mglt}</li>
        <select value={props.starship} onChange={handleChange}>
          <option value=''>Select a ship</option>
          {props.starships.map((a, i) => <option key={i} value={a.name}>{a.name} - cost: {a.cost} speed: {a.mglt}</option>)}
        </select>
      </ul>
    </div>
  );
};

export default PlayerInfo;