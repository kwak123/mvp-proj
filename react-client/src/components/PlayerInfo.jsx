import React from 'react';

var PlayerInfo = (props) => {
  return (
    <div>
      <ul>
        <li>Name: {props.player.username}</li>
        <li>Species: {props.player.species}</li>
        <li>Credits: {props.credits}</li>
      </ul>
    </div>
  );
};

export default PlayerInfo;