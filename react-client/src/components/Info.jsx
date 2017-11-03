import React from 'react';

var Info = (props) => {
  return (
    <div>
      <h3>Valid species</h3>
      <ul>
        {props.species.map((spec, i) => <li key={i}>{spec.name}</li>)}
      </ul>
    </div>
  )
};

export default Info;