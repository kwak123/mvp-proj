import React from 'react';

var PlayerInfo = (props) => {
  let handleChange = (e) => {
    props.handleShipPurchase(e.target.value);
  };

  let ulStyle = {
    'padding': '0 8px 0 8px',
  }

  let liStyle = {
    'listStyleType': 'none',
    'margin': '2px 4px'
  };

  return (
    <div style={{'float':'left', 'border': 'solid #000 1px'}}>
      <ul style={ulStyle}>
        <li style={liStyle}>Name: {props.player.username}</li>
        <li style={liStyle}>Species: {props.player.species}</li>
        <li style={liStyle}>Credits: {props.credits}</li>
        <li style={liStyle}>Starship: {props.starship.name}</li>
        <li style={liStyle}>Speed: {props.starship.mglt}</li>
        <select value={props.starship} onChange={handleChange}>
          <option value=''>Select a ship</option>
          {props.starships.map((a, i) => <option key={i} value={a.name}>{a.name} - cost: {a.cost} speed: {a.mglt}</option>)}
        </select>
      </ul>
    </div>
  );
};

export default PlayerInfo;