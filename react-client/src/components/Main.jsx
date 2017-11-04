import React from 'react';
import axios from 'axios';

var Main = (props) => (
      <div style={{'height': 120}}>
        <h4>Get there ASAP</h4>
        <h2>Destination: {props.planet}</h2>
        <h3>Remaining distance: {props.distance}</h3>
      </div>
);

export default Main;